import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { signOut } = useAuth()

  return (
    <header className="w-full bg-blue-900 mx-auto flex items-center justify-between px-4 py-3">
      <div>
        <Button variant="link" className="text-white">
          Tarefas
        </Button>

        <Button variant="link" className="text-white">
          Membros
        </Button>
      </div>
      <div>
        <Button variant="outline" className="mr-2">
          Adicionar tarefa
        </Button>
        <Button variant="outline" onClick={signOut}>
          Sair
        </Button>
      </div>
    </header>
  )
}
