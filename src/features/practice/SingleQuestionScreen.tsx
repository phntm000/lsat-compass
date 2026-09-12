import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Screen from '../../components/Screen';
import { EmptyState, LoadingSkeleton } from '../../components';
import { useStudy } from '../../state/study';
import { QuestionRunner } from './QuestionRunner';

export default function SingleQuestionScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ready } = useStudy();
  const [done, setDone] = useState(false);

  if (!ready) {
    return (
      <Screen title="Question">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  if (!id) {
    return (
      <Screen title="Question">
        <EmptyState
          title="No question selected"
          body="Pick a question to practice from a session or review queue."
          actionLabel="Back to Practice"
          onAction={() => navigate('/practice')}
        />
      </Screen>
    );
  }

  if (done) {
    return (
      <Screen title="Question">
        <EmptyState
          title="Nice work"
          body="You've finished this question. Keep the momentum going."
          actionLabel="Back to Practice"
          onAction={() => navigate('/practice')}
        />
      </Screen>
    );
  }

  return (
    <Screen title="Question">
      <QuestionRunner
        questionId={id}
        mode="learning"
        compact={false}
        onAnswer={() => setDone(true)}
        onExit={() => navigate('/practice')}
      />
    </Screen>
  );
}
