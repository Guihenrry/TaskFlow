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
import useCreateSpaceMutation from '@/queries/useCreateSpaceMutation'
import { useState } from 'react'

type Inputs = {
  images: FileList
  name: string
  capacity: string
  price: string
  open_at: string
  closes_at: string
}

export function AddSpaceDialog() {
  const [open, setOpen] = useState(false)
  const createSpaceMutation = useCreateSpaceMutation()
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData()
    Array.from(data.images).forEach((image) => {
      formData.append('images', image)
    })
    formData.append('name', data.name)
    formData.append('capacity', data.capacity)
    formData.append('open_at', `${data.open_at.split(':')[0]}:00`)
    formData.append('closes_at', `${data.closes_at.split(':')[0]}:00`)
    await createSpaceMutation.mutateAsync(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adicionar espaço
          </span>
        </Button>
      </DialogTrigger>
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
              <Label htmlFor="images" className="text-right">
                Imagens
              </Label>
              <Input
                {...register('images', { required: true })}
                type="file"
                id="images"
                className="col-span-3"
                accept="image/*"
                multiple
              />
            </div>
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
              <Label htmlFor="price" className="text-right">
                Preço
              </Label>
              <Input
                {...register('price', { required: true })}
                type="number"
                id="price"
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="open_at" className="text-right">
                Abertura
              </Label>
              <Input
                {...register('open_at', { required: true })}
                type="time"
                id="open_at"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="closes_at" className="text-right">
                Fechamento
              </Label>
              <Input
                {...register('closes_at', { required: true })}
                type="time"
                id="closes_at"
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
