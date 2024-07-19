import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export type Member = {
  id: string
  role: string
  name: string
  email: string
  allocatedHours: number
}

async function getMembers() {
  const response = await api.get('/members')
  return response.data
}

export const QUERY_KEY = ['members']

export function useMembersQuery() {
  return useQuery<Member[]>({
    queryKey: QUERY_KEY,
    queryFn: getMembers,
  })
}
