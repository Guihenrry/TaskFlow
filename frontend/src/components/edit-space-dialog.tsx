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
import useCreateSpaceMutation from '@/queries/useCreateSpaceMutation'
import api from '@/services/api'
import toast from 'react-hot-toast'
import queryClient from '@/services/queryClient'

type Inputs = {
  name: string
  capacity: string
}

type EditSpaceDialogProps = {
  space: {
    id: number
    name: string
    capacity: number
  }
  onClose: () => void
}

export function EditSpaceDialog({ space, onClose }: EditSpaceDialogProps) {
  const open = !!space
  const createSpaceMutation = useCreateSpaceMutation()
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: space.name,
      capacity: String(space.capacity),
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await api.put(`/spaces/${space.id}`, {
        name: data.name,
        capacity: Number(data.capacity),
      })
      toast.success('Espaço atualizado com sucesso')
      queryClient.invalidateQueries()
      onClose()
    } catch (error) {
      toast.error('Ops ocorreu um error ao atualizar')
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Adicionar espaço</DialogTitle>
            <DialogDescription>
              Adicione as informações do espaço aqui. Clique em salvar para
              finalizar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                {...register('name', { required: true })}
                id="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacidade
              </Label>
              <Input
                {...register('capacity', { required: true })}
                type="number"
                id="capacity"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={createSpaceMutation.status === 'pending'}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
