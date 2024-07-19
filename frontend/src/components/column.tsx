import { Droppable } from 'react-beautiful-dnd'
import { Task } from './task'

export function Column({ column, tasks, onClickTask }) {
  return (
    <div className="w-[260px] bg-blue-100 p-3 rounded-sm">
      <h3 className="mb-1 text-sm text-blue-950 font-medium">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="min-h-3"
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onClick={() => onClickTask(task)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
