import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

type Space = {
  id: number
  name: string
  space_images: Array<string>
  capacity: number
  price: number
  closes_at: string
  open_at: string
  created_at: string
}

async function getSpaces(id?: string) {
  const response = await api.get(`/spaces/${id}`)
  return response.data
}

export function useShowSpaceQuery(id?: string) {
  return useQuery<Space>({
    queryKey: ['spaces', id],
    queryFn: () => getSpaces(id),
  })
}
