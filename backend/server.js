import dotenv from 'dotenv'
import mongoose from 'mongoose'

import app from './app.js'

dotenv.config()

export const server = app.listen(process.env.PORT)

mongoose.connect(process.env.MONGO_URI).then().catch(console.error)
