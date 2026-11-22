import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFeedback, listFeedback } from './feedback-api';

const KEY = ['feedback'];

export const useFeedbackList = () => useQuery({ queryKey: KEY, queryFn: listFeedback });

export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFeedback,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}
