import express from 'express'

import * as boardsController from './controllers/boards'
import * as membersController from './controllers/members'

const routes = express.Router()

routes.get('/board', boardsController.get)
routes.put('/board', boardsController.update)

routes.post('/members', membersController.create)
routes.get('/members', membersController.list)
routes.get('/members/:id', membersController.show)
routes.put('/members/:id', membersController.update)
routes.delete('/members/:id', membersController.remove)

export default routes
