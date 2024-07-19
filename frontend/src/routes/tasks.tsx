import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'
import { Board } from '@/components/board'

import { useUpdateBoardMutation } from '@/queries/useUpdateBoardMutation'
import { useBoardQuery } from '@/queries/useBoardQuery'
import { useAuth } from '@/hooks/useAuth'

export function Tasks() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const { data } = useBoardQuery()
  const { mutateAsync } = useUpdateBoardMutation()

  async function handleUpdateBoard(boardData) {
    await mutateAsync(boardData)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in')
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="overflow-x-auto flex-1 bg-blue-500">
        {data && (
          <div className="flex gap-5 items-start p-8 min-w-[800px]">
            <Board initialData={data} onUpdate={handleUpdateBoard} />
          </div>
        )}
      </div>
    </div>
  )
}
