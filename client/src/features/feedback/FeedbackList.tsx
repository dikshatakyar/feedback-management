import type { Feedback } from './feedback-api';

type Props = {
  items: Feedback[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function FeedbackList({ items, isLoading, error }: Props) {
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p role="alert" className="error">{error.message}</p>;
  if (!items?.length) return <p>No feedback yet.</p>;

  return (
    <ul>
      {items.map((f) => (
        <li key={f.id}>
          <p>{f.message}</p>
          <span className="meta">Rating: {f.rating}/5 · {f.createdAt}</span>
        </li>
      ))}
    </ul>
  );
}
