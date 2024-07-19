import { Request, Response } from 'express'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
import { setDoc, getDoc } from 'firebase/firestore'

export async function get(req: Request, res: Response) {
  const docRef = doc(db, 'boards', 'main')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()

    return res.json(data)
  } else {
    res.status(404).json({ message: 'Task not found' })
  }
}

export async function update(req: Request, res: Response) {
  await setDoc(doc(db, 'boards', 'main'), req.body)
  return res.json(req.body)
}
