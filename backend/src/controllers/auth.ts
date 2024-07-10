import { Request, Response } from 'express'

export async function signIn(req: Request, res: Response) {
  return res.json({ todo: true })
}

export async function signUp(req: Request, res: Response) {
  return res.json({ todo: true })
}
