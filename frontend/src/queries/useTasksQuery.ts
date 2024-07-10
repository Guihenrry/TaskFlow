import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export type Space = {
  id: number
  name: string
  capacity: number
  created_at: string
  space_images: Array<string>
}

async function getTasks() {
  const response = await api.get('/tasks')
  return response.data
}

export const QUERY_KEY = ['tasks']

export function useTasksQuery() {
  return useQuery<Space[]>({
    queryKey: QUERY_KEY,
    queryFn: getTasks,
  })
}
