import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deactivateUserMutationFn } from '../mutations';

const useDeactivateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateUserMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export { useDeactivateUserMutation };
