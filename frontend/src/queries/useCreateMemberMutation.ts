import { useMutation } from '@tanstack/react-query'

import api from '@/services/api'
import queryClient from '@/services/queryClient'

type FormType = {
  name: string
  role: string
  email: string
}

async function createMember(formData: FormType) {
  const response = await api.post('/members', formData)
  return response.data
}

export default function useCreateMemberMutation() {
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
