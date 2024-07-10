import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export type Data = {
  space: {
    id: number
    created_at: string
    name: string
    capacity: number
    open_at: string
    closes_at: string
    price: number
  }
  reservations: Array<{
    id: number
    created_at: string
    space_id: number
    user_id: string
    start_time: string
    end_time: string
    canceled: boolean
    date: string
    users: {
      name: string
      phone: string
    }
  }>
}

type GetSpaceReservationsProps = {
  token?: string
  id?: string
}

async function getSpaceReservations({ token, id }: GetSpaceReservationsProps) {
  const response = await api.get(`/spaces/${id}/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export function useSpaceReservationsQuery({
  id,
  token,
}: GetSpaceReservationsProps) {
  return useQuery<Data>({
    queryKey: ['spaceReservations', id],
    queryFn: () => getSpaceReservations({ token, id }),
  })
}
