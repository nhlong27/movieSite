import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentMutationFn } from '../mutations';

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommentMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export { useDeleteCommentMutation };
