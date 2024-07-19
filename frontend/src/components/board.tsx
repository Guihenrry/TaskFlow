import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { Column } from './column'
import { Task } from '@/queries/useBoardQuery'
import { EditTaskDialog } from './edit-task-dialog'

export function Board({ initialData, onUpdate }) {
  const [data, setData] = useState(initialData)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>()

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = data.columns[source.droppableId]
    const finishColumn = data.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      }

      console.log(newState)

      setData(newState)
      onUpdate(newState)
      return
    }

    const startTaskIds = Array.from(startColumn.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finishColumn.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    }

    setData(newState)
    onUpdate(newState)
  }

  const handleClickTask = (task: Task) => {
    setTaskToEdit(task)
  }

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onClickTask={handleClickTask}
            />
          )
        })}
      </DragDropContext>

      {taskToEdit && (
        <EditTaskDialog task={taskToEdit} onClose={() => setTaskToEdit(null)} />
      )}
    </>
  )
}
