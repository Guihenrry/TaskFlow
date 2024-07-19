import { useMutation } from '@tanstack/react-query'

import api from '@/services/api'
import queryClient from '@/services/queryClient'

async function deleteMember(id: string) {
  const response = await api.delete(`/members/${id}`)
  return response.data
}

export function useDeleteMemberMutation() {
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
