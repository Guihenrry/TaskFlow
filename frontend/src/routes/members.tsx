import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AddMemberDialog } from '@/components/add-member-dialog'
import { DeleteMemberDialog } from '@/components/delete-member-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuth } from '@/hooks/useAuth'
import { useDeleteMemberMutation } from '@/queries/useDeleteMemberMutation'
import { useMembersQuery, Member } from '@/queries/useMembersQuery'
import { EditMemberDialog } from '@/components/edit-member-dialog'

export function Members() {
  const { signOut, isLoggedIn } = useAuth()
  const { data } = useMembersQuery()
  const navigate = useNavigate()

  const [toDeleteId, setToDeleteId] = useState<string | null>()
  const [memberToEdit, setMemberToEdit] = useState<Member | null>()
  const deleteMemberMutation = useDeleteMemberMutation()

  async function handleDeleteDialog() {
    if (toDeleteId) {
      await deleteMemberMutation.mutateAsync(toDeleteId)
      setToDeleteId(null)
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in')
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="h-screen flex flex-col bg-blue-100">
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
          <AddMemberDialog />
          <Button className="ml-2" variant="outline" onClick={signOut}>
            Sair
          </Button>
        </div>
      </header>

      <div className="flex-1 m-4">
        <div className="bg-white border rounded-md">
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Horas alocadas</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.allocatedHours}h</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        className="mr-1"
                        onClick={() => setMemberToEdit(item)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setToDeleteId(item.id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <DeleteMemberDialog
        open={!!toDeleteId}
        onClose={() => setToDeleteId(null)}
        onSubmit={handleDeleteDialog}
        isLoading={deleteMemberMutation.status === 'pending'}
      />

      {memberToEdit && (
        <EditMemberDialog
          onClose={() => setMemberToEdit(null)}
          member={{
            id: memberToEdit.id,
            name: memberToEdit.name,
            role: memberToEdit.role,
            email: memberToEdit.email,
          }}
        />
      )}
    </div>
  )
}
