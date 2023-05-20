import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCommentMutationFn } from '../mutations';

const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCommentMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export { useUpdateCommentMutation };
