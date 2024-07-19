import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { AddTaskDialog } from './add-task-dialog'

export function Header() {
  const { signOut } = useAuth()

  return (
    <header className="w-full bg-blue-600 mx-auto flex items-center justify-between px-4 py-3">
      <div>
        <Link to={'/'}>
          <Button variant="link" className="text-white">
            Tarefas
          </Button>
        </Link>

        <Link to={'/members'}>
          <Button variant="link" className="text-white">
            Membros
          </Button>
        </Link>
      </div>
      <div>
        <AddTaskDialog />
        <Button className="ml-2" variant="outline" onClick={signOut}>
          Sair
        </Button>
      </div>
    </header>
  )
}
