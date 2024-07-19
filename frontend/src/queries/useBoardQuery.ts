import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export type Task = {
  id: string
  title: string
  description: string
  priority: string
  date: string
  spentHours: number
  estimatesHours: number
  memberId: number
  ownerName: string
}

type Column = {
  id: string
  title: string
  taskIds: string[]
}

type BoardData = {
  tasks: {
    [key: string]: Task
  }
  columns: {
    [key: string]: Column
  }
  columnOrder: string[]
}

async function getBoard() {
  const boardResponse = await api.get('/board')
  const membersResponse = await api.get('/members')
  const memberMap = membersResponse.data.reduce((acc, member) => {
    acc[member.id] = member.name
    return acc
  }, {})

  const board = boardResponse.data
  Object.values(board.tasks).forEach((task: Task) => {
    if (task.memberId && memberMap[task.memberId]) {
      task.ownerName = memberMap[task.memberId]
    }
  })

  return board
}

export const QUERY_KEY = ['board']

export function useBoardQuery() {
  return useQuery<BoardData>({
    queryKey: QUERY_KEY,
    queryFn: getBoard,
  })
}
