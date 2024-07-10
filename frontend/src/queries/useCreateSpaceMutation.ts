import { useMutation } from '@tanstack/react-query'

import api from '@/services/api'
import queryClient from '@/services/queryClient'

async function createSpace(formData: FormData) {
  const response = await api.post('/spaces', formData)
  return response.data
}

export default function useCreateSpaceMutation() {
  return useMutation({
    mutationFn: createSpace,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
