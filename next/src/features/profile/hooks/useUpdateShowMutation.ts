import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShowMutationFn } from '../mutations';

const useUpdateShowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShowMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shows'] });
    },
  });
};

export { useUpdateShowMutation };
