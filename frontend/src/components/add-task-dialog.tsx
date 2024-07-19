import { useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function AddTaskDialog() {
  const [open, setOpen] = useState(false)
  const { data } = useBoardQuery()
  const updateBoardMutation = useUpdateBoardMutation()

  const membersQuery = useMembersQuery()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (task) => {
    const newTaskId = `task-${Date.now()}`
    const newTask = { ...task, id: newTaskId }
    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          taskIds: [...data.columns['column-1'].taskIds, newTaskId],
        },
      },
    }

    setOpen(false)
    updateBoardMutation.mutate(newState)
  }

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adicionar tarefa
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Adicionar tarefa</DialogTitle>
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
