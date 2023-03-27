import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserMutationFn } from '../mutations';

const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export { useUpdateUserMutation };
