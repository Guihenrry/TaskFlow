import { useMutation } from '@tanstack/react-query'

import api from '@/services/api'
import queryClient from '@/services/queryClient'

async function deleteSpace(id: number) {
  const response = await api.delete(`/spaces/${id}`)
  return response.data
}

export function useDeleteSpaceMutation() {
  return useMutation({
    mutationFn: deleteSpace,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
