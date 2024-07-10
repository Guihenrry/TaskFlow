import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

type Hour = {
  hour: string
  available: boolean
}

type GetSpaceHoursParams = {
  id?: string
  date?: string
}

async function getSpaceHours({ id, date }: GetSpaceHoursParams) {
  const response = await api.get(`/spaces/${id}/hours?date=${date}`)
  return response.data
}

export function useSpaceHoursQuery({ id, date }: GetSpaceHoursParams) {
  return useQuery<Hour[]>({
    queryKey: ['spaces', id, 'hours', date],
    queryFn: () => getSpaceHours({ id, date }),
  })
}
