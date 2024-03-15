import mongoose from 'mongoose'

import Reading from './reading.model.js'

const counterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        tariff_day: {
            type: Number,
            required: true,
            min: 0,
        },
        tariff_night: {
            type: Number,
            required: true,
            min: 0,
        },
        penalty_day: {
            type: Number,
            required: true,
            min: 0,
        },
        penalty_night: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
)

counterSchema.post('save', async function (doc, next) {
    await Reading.create({
        counter_id: doc._id,
        energy_day: 0,
        energy_night: 0,
    })
    next()
})

counterSchema.post('findOneAndDelete', async function (doc, next) {
    if (doc) await Reading.deleteMany({ counter_id: doc._id })
    next()
})

export default mongoose.model('Counter', counterSchema)
