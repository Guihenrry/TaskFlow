import { Header } from '@/components/header'
import {} from 'react-beautiful-dnd'

import { useTasksQuery } from '@/queries/useTasksQuery'

export function Home() {
  const { data } = useTasksQuery()

  console.log(data)

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="bg-blue-400 flex flex-1 gap-5 items-start p-8">
        <div className="w-[260px] bg-gray-200 px-3 py-2">
          <h2 className="mb-2">TODO</h2>

          <div className="flex flex-col gap-2">
            <div className="bg-white h-[112px]"></div>
            <div className="bg-white h-[112px]"></div>
            <div className="bg-white h-[112px]"></div>
            <div className="bg-white h-[112px]"></div>
          </div>
        </div>

        <div className="w-[260px] bg-gray-200 px-3 py-2">
          <h2 className="mb-2">DOING</h2>

          <div className="flex flex-col gap-2">
            <div className="bg-white h-[112px]"></div>
            <div className="bg-white h-[112px]"></div>
          </div>
        </div>

        <div className="w-[260px] bg-gray-200 px-3 py-2">
          <h2 className="mb-2">DONE</h2>

          <div className="flex flex-col gap-2">
            <div className="bg-white h-[112px]"></div>
            <div className="bg-white h-[112px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
