import { Router } from 'express'
import {
    createCounter,
    deleteCounter,
    getAllCounters,
    getCounterHistory,
    updateCounter,
} from '../controllers/counter.controller.js'

const router = new Router()

router.route('/').post(createCounter).get(getAllCounters)
router.route('/:id').patch(updateCounter).delete(deleteCounter)
router.route('/:id/history').get(getCounterHistory)

export default router
