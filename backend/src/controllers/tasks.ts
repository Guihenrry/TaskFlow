import { Request, Response } from 'express'
import { collection, query, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'
import { setDoc } from 'firebase/firestore'

export async function create(req: Request, res: Response) {
  const id = new Date().getTime().toString()
  await setDoc(doc(db, 'task', id), req.body)
  return res.json(req.body)
}

export async function update(req: Request, res: Response) {
  const id = req.params.id
  await setDoc(doc(db, 'task', id), req.body, { merge: true })
  return res.json(req.body)
}

export async function list(req: Request, res: Response) {
  const q = query(collection(db, 'task'))
  const querySnapshot = await getDocs(q)

  const tasks = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data()

      if (data.owner) {
        const refDoc = await getDoc(data.owner)

        return {
          id: doc.id,
          ...data,
          owner: refDoc.exists() ? refDoc.data() : null,
        }
      } else {
        return {
          id: doc.id,
          ...data,
        }
      }
    })
  )

  return res.json(tasks)
}

export async function show(req: Request, res: Response) {
  const docRef = doc(db, 'task', req.params.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()

    if (data.owner) {
      const refDoc = await getDoc(data.owner)

      res.json({
        id: docSnap.id,
        ...data,
        owner: refDoc.exists() ? refDoc.data() : null,
      })
    }

    return res.json({
      id: docSnap.id,
      ...data,
    })
  } else {
    res.status(404).json({ message: 'Task not found' })
  }
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id
  await deleteDoc(doc(db, 'task', id))

  return res.status(204).send()
}
