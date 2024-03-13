import express from 'express'
import cors from 'cors'

import counterRouter from './routes/counter.route.js'
import readingRouter from './routes/reading.route.js'
import errorHandler from './utils/errors/errorHandler.js'
import notFound from './utils/errors/notFound.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://electricity-counters.netlify.app',
        ],
    })
)

app.use('/api/counters', counterRouter)
app.use('/api/readings', readingRouter)

app.use(notFound)
app.use(errorHandler)

export default app
