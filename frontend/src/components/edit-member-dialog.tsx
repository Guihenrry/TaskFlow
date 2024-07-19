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
import api from '@/services/api'
import toast from 'react-hot-toast'
import queryClient from '@/services/queryClient'

type Inputs = {
  name: string
  email: string
  role: string
}

type EditMemberDialogProps = {
  member: {
    id: string
    name: string
    email: string
    role: string
  }
  onClose: () => void
}

export function EditMemberDialog({ member, onClose }: EditMemberDialogProps) {
  const open = !!member
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: member.name,
      email: member.email,
      role: member.role,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await api.put(`/members/${member.id}`, {
        name: data.name,
        email: data.email,
        role: data.role,
      })
      toast.success('Membro atualizado com sucesso')
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
            <DialogTitle>Editar membro</DialogTitle>
            <DialogDescription>
              Adicione as informações do membro aqui. Clique em salvar para
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
              <Label htmlFor="role" className="text-right">
                Cargo
              </Label>
              <Input
                {...register('role', { required: true })}
                id="role"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                {...register('email', { required: true })}
                type="email"
                id="email"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
