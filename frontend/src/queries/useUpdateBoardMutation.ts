import { useMutation } from '@tanstack/react-query'

import api from '@/services/api'
import queryClient from '@/services/queryClient'

async function updateBoard(boardData) {
  await api.put('/board', boardData)
}

export function useUpdateBoardMutation() {
  return useMutation({
    mutationFn: updateBoard,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
