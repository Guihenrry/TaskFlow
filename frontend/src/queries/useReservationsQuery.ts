import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export type Reservations = {
  canceled: boolean
  created_at: string
  date: string
  end_time: string
  id: number
  space_id: number
  start_time: string
  user_id: string
  spaces: {
    id: number
    name: string
  }
}

type GetReservationsProps = {
  token?: string
}

async function getReservations({ token }: GetReservationsProps) {
  const response = await api.get('/reservations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export function useReservationsQuery({ token }: GetReservationsProps) {
  return useQuery<Reservations[]>({
    queryKey: ['reservations', token],
    queryFn: () => getReservations({ token }),
  })
}
