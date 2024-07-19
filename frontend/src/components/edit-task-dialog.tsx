import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useBoardQuery } from '@/queries/useBoardQuery'
import { useMembersQuery } from '@/queries/useMembersQuery'
import { useUpdateBoardMutation } from '@/queries/useUpdateBoardMutation'

type Inputs = {
  title: string
  description: string
  priority: string
  date: string
  spentHours: number
  estimatesHours: number
  memberId: number
  ownerName: string
}

type EditTaskDialogProps = {
  task: {
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
  onClose: () => void
}

export function EditTaskDialog({ task, onClose }: EditTaskDialogProps) {
  const open = !!task
  const updateBoardMutation = useUpdateBoardMutation()
  const { data } = useBoardQuery()

  const membersQuery = useMembersQuery()
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      date: task.date,
      spentHours: task.spentHours,
      estimatesHours: task.estimatesHours,
      memberId: task.memberId,
      ownerName: task.ownerName,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (taskData) => {
    const newTask = { ...taskData, id: task.id }
    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [task.id]: newTask,
      },
    }
    updateBoardMutation.mutate(newState)
    onClose()
  }

  const handleDeleteTask = async (taskId: string) => {
    const newTasks = { ...data.tasks }
    delete newTasks[taskId]

    const newColumns = { ...data.columns }
    Object.keys(newColumns).forEach((columnId) => {
      const taskIds = newColumns[columnId].taskIds
      newColumns[columnId].taskIds = taskIds.filter((id) => id !== taskId)
    })

    const newState = {
      ...data,
      tasks: newTasks,
      columns: newColumns,
    }

    updateBoardMutation.mutate(newState)
    onClose()
  }

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar tarefa</DialogTitle>
            <DialogDescription>
              Adicione as informações da tarefa aqui. Clique em salvar para
              finalizar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input {...register('title', { required: true })} id="title" />
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea {...register('description')} id="description" />
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Input {...register('date')} type="date" id="date" />
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="priority" className="text-right">
                Prioridade
              </Label>

              <select
                {...register('priority', { required: true })}
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="estimatesHours" className="text-right">
                Estimativa em horas
              </Label>
              <Input
                {...register('estimatesHours')}
                id="estimatesHours"
                type="number"
                min={0}
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="spentHours" className="text-right">
                Tempo gasto em horas
              </Label>
              <Input
                {...register('spentHours')}
                id="spentHours"
                type="number"
                min={0}
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="memberId" className="text-right">
                Responsável
              </Label>

              <select
                {...register('memberId')}
                id="memberId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Não definido</option>
                {membersQuery.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => handleDeleteTask(task.id)}
            >
              Deletar
            </Button>

            <Button
              type="submit"
              disabled={updateBoardMutation.status === 'pending'}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
