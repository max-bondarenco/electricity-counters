import { Router } from 'express'
import { createReading } from '../controllers/reading.controller.js'

const router = new Router()

router.route('/').post(createReading)

export default router
