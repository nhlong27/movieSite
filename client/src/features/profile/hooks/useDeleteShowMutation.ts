import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteShowMutationFn } from '../mutations';

const useDeleteShowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShowMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shows'] });
    },
  });
};

export { useDeleteShowMutation };
