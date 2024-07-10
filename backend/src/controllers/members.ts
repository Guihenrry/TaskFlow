import { Request, Response } from 'express'
import {
  collection,
  query,
  deleteDoc,
  getDocs,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'
import { setDoc } from 'firebase/firestore'

export async function create(req: Request, res: Response) {
  const id = new Date().getTime().toString()
  await setDoc(doc(db, 'member', id), req.body)
  return res.json(req.body)
}

export async function update(req: Request, res: Response) {
  const id = req.params.id
  await setDoc(doc(db, 'member', id), req.body, { merge: true })
  return res.json(req.body)
}

type Task = {
  spent_hours: number
}

export async function list(req: Request, res: Response) {
  const q = query(collection(db, 'member'))
  const querySnapshot = await getDocs(q)

  const members = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data()

      const tasksQuery = query(
        collection(db, 'task'),
        where('owner', '==', doc.ref)
      )
      const tasksQuerySnapshot = await getDocs(tasksQuery)
      const tasks = tasksQuerySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      const allocatedHours = tasks.reduce((acc, item: any) => {
        return acc + item.spent_hours
      }, 0)

      return {
        id: doc.id,
        ...data,
        allocatedHours: allocatedHours,
      }
    })
  )

  return res.json(members)
}

export async function show(req: Request, res: Response) {
  const docRef = doc(db, 'member', req.params.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return res.json({
      id: docSnap.id,
      ...data,
    })
  } else {
    res.status(404).json({ message: 'Member not found' })
  }
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id
  await deleteDoc(doc(db, 'member', id))

  return res.status(204).send()
}
