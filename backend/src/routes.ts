import express from 'express'

import { validate } from './middlewares/validate'
import * as authController from './controllers/auth'
import * as tasksController from './controllers/tasks'
import * as membersController from './controllers/members'
import * as authSchemas from './schemas/auth'

const routes = express.Router()

routes.post('/signin', validate(authSchemas.signIn), authController.signIn)
routes.post('/signup', validate(authSchemas.signUp), authController.signUp)

routes.post('/tasks', tasksController.create)
routes.get('/tasks', tasksController.list)
routes.get('/tasks/:id', tasksController.show)
routes.put('/tasks/:id', tasksController.update)
routes.delete('/tasks/:id', tasksController.remove)

routes.post('/members', membersController.create)
routes.get('/members', membersController.list)
routes.get('/members/:id', membersController.show)
routes.put('/members/:id', membersController.update)
routes.delete('/members/:id', membersController.remove)

export default routes
