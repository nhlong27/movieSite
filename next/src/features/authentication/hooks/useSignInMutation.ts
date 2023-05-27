import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInMutationFn } from '../mutations';

const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signInMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export { useSignInMutation };
