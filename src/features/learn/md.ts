/**
 * Tiny markdown-lite renderer for authored lesson prose.
 *
 * Handles: ## / ### headings, **bold**, *italic*, `code`, - bullet lists,
 * 1. numbered lists, paragraphs, --- horizontal rules.
 *
 * HTML is escaped BEFORE any markup is applied, and the renderer only emits
 * tags from the fixed list above — output is safe for dangerouslySetInnerHTML.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(md: string): string {
  let s = escapeHtml(md);
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return s;
}

export function mdToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let para: string[] = [];

  const closeList = () => {
    if (list) {
      out.push(list === 'ul' ? '</ul>' : '</ol>');
      list = null;
    }
  };
  const flushPara = () => {
    if (para.length > 0) {
      out.push(`<p>${para.map(inline).join(' ')}</p>`);
      para = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line === '---') {
      flushPara();
      closeList();
      out.push('<hr />');
      continue;
    }

    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      flushPara();
      closeList();
      out.push(`<h3>${inline(h3[1])}</h3>`);
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flushPara();
      closeList();
      out.push(`<h2>${inline(h2[1])}</h2>`);
      continue;
    }

    const ul = line.match(/^-\s+(.*)$/);
    if (ul) {
      flushPara();
      if (list !== 'ul') {
        closeList();
        out.push('<ul>');
        list = 'ul';
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      flushPara();
      if (list !== 'ol') {
        closeList();
        out.push('<ol>');
        list = 'ol';
      }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    if (line === '') {
      flushPara();
      closeList();
      continue;
    }

    para.push(line);
  }

  flushPara();
  closeList();
  return out.join('\n');
}
