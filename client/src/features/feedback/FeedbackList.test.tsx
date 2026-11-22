import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeedbackList } from './FeedbackList';

describe('FeedbackList', () => {
  it('shows an empty state', () => {
    render(<FeedbackList items={[]} isLoading={false} error={null} />);
    expect(screen.getByText('No feedback yet.')).toBeTruthy();
  });

  it('renders items', () => {
    const items = [{ id: 1, message: 'Great app', rating: 5, createdAt: '2026-01-01' }];
    render(<FeedbackList items={items} isLoading={false} error={null} />);
    expect(screen.getByText('Great app')).toBeTruthy();
  });

  it('shows the error', () => {
    render(<FeedbackList items={undefined} isLoading={false} error={new Error('Boom')} />);
    expect(screen.getByRole('alert').textContent).toBe('Boom');
  });
});
