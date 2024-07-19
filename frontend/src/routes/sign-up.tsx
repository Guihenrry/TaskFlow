import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '@/hooks/useAuth'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Informe um endereço de e-mail válido.',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})

export function SignUp() {
  const { signUp } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    try {
      await signUp({ email: data.email, password: data.password })
    } catch (error) {
      console.error(error)
      toast.error('Credenciais de login inválidas')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen flex flex-col p-4 items-center justify-center gap-8 bg-gray-100"
    >
      <Link to="/">
        <Logo className="w-48 text-blue-700" />
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Digite seus dados abaixo para realizar o cadastro.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password?.message && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Cadastra-se
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm">
        Já tem uma conta?{' '}
        <Link to="/sign-in" className="underline">
          Entrar
        </Link>
      </div>
    </form>
  )
}
