import mongoose from 'mongoose'

const readingSchema = new mongoose.Schema(
    {
        counter_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Counter',
            required: true,
        },
        energy_day: {
            type: Number,
            required: true,
            min: 0,
        },
        energy_night: {
            type: Number,
            required: true,
            min: 0,
        },
        to_pay: {
            type: Number,
        },
    },
    { timestamps: true }
)

export default mongoose.model('Reading', readingSchema)
