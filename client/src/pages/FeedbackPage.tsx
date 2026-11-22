import { FeedbackForm } from '../features/feedback/FeedbackForm';
import { FeedbackList } from '../features/feedback/FeedbackList';
import { useFeedbackList } from '../features/feedback/useFeedback';

export function FeedbackPage() {
  const { data, isLoading, error } = useFeedbackList();

  return (
    <main>
      <h1>Pulse</h1>
      <FeedbackForm />
      <FeedbackList items={data} isLoading={isLoading} error={error} />
    </main>
  );
}
