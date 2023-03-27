import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signUpMutationFn } from "../mutations"

const useSignUpMutation = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export {useSignUpMutation}