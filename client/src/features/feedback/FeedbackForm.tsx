import { useState, type FormEvent } from 'react';
import { useSubmitFeedback } from './useFeedback';

export function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const submit = useSubmitFeedback();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit.mutate({ message, rating }, { onSuccess: () => setMessage('') });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} required />
      </label>
      <label>
        Rating
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      {submit.error && <p role="alert" className="error">{submit.error.message}</p>}
      <button type="submit" disabled={submit.isPending}>
        {submit.isPending ? 'Sending…' : 'Submit feedback'}
      </button>
    </form>
  );
}
