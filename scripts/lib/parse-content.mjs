#!/usr/bin/env node
/**
 * Shared text parser for LSAT Compass content source files.
 * Reads src/content/questions/*.ts, passages/*.ts, lessons/*.ts as text and
 * extracts item records with regex (the source format is regular and
 * validated by tests/content.test.ts). Avoids needing a TS toolchain.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../..', import.meta.url).pathname;
const QDIR = join(ROOT, 'src/content/questions');
const PDIR = join(ROOT, 'src/content/passages');

function splitItems(src) {
  const parts = src.split(/(\n    id: ')/);
  const items = [];
  for (let i = 1; i < parts.length; i += 2) {
    const chunk = parts[i] + (parts[i + 1] ?? '');
    items.push(chunk);
  }
  return items;
}

const field = (chunk, name, pattern) => {
  const m = chunk.match(pattern || new RegExp(`${name}: '([^']*)'`));
  return m ? m[1] : null;
};

export function parseQuestions() {
  const out = [];
  for (const f of readdirSync(QDIR).filter(f => f.endsWith('.ts'))) {
    const src = readFileSync(join(QDIR, f), 'utf8');
    for (const chunk of splitItems(src)) {
      const id = field(chunk, 'id');
      if (!id) continue;
      const choices = [...chunk.matchAll(/\{ text: '((?:[^'\\]|\\.)*)' \}/g)].map(m => m[1]);
      out.push({
        id,
        file: f,
        sectionType: field(chunk, 'sectionType'),
        questionType: field(chunk, 'questionType'),
        editorialDifficulty: Number(field(chunk, 'editorialDifficulty', /editorialDifficulty: ([1-5])/)),
        itemPurpose: field(chunk, 'itemPurpose'),
        validationStatus: field(chunk, 'validationStatus'),
        passageId: field(chunk, 'passageId'),
        stimulus: field(chunk, 'stimulus', /stimulus:\s*'((?:[^'\\]|\\.)*)'/s)
          || field(chunk, 'stimulus', /stimulus:\s*"((?:[^"\\]|\\.)*)"/s) || '',
        stem: (field(chunk, 'stem', /stem: '((?:[^'\\]|\\.)*)'/) || '').slice(0, 120),
        choices,
        correctIndex: Number(field(chunk, 'correctIndex', /correctIndex: ([0-4])/)),
        topic: field(chunk, 'labels', /topic: "([^"]*)"/) || field(chunk, 'labels', /topic: '([^']*)'/),
        hasDifficultyProfile: /difficultyProfile: \{[^}]*\w/.test(chunk),
      });
    }
  }
  return out;
}

export function parsePassages() {
  const out = [];
  for (const f of readdirSync(PDIR).filter(f => f.endsWith('.ts'))) {
    const src = readFileSync(join(PDIR, f), 'utf8');
    const parts = src.split(/(\n    id: ')/);
    for (let i = 1; i < parts.length; i += 2) {
      const chunk = parts[i] + (parts[i + 1] ?? '');
      const id = (chunk.match(/id: '([^']*)'/) || [])[1];
      if (!id) continue;
      const paras = [...chunk.matchAll(/'((?:[^'\\]|\\.){80,})'/g)].map(m => m[1]);
      out.push({
        id,
        file: f,
        title: (chunk.match(/title: '((?:[^'\\]|\\.)*)'/) || [])[1] || '',
        domain: (chunk.match(/domain: '([^']*)'/) || [])[1] || '',
        comparative: /comparative: true/.test(chunk),
        questionIds: [...chunk.matchAll(/'(rc-[a-z0-9]+-q[0-9]+)'/g)].map(m => m[1]),
        wordCount: paras.join(' ').split(/\s+/).filter(Boolean).length,
        paragraphCount: (chunk.match(/paragraphs: \[/g) || []).length,
      });
    }
  }
  return out;
}

/** Normalized token set for similarity. */
export function tokenSet(s) {
  return new Set(
    s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 3)
  );
}

/** Jaccard similarity of two token sets. */
export function jaccard(a, b) {
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter || 1);
}
