import catchAsync from '../utils/errors/catchAsync.js'
import Reading from '../models/reading.model.js'
import Counter from '../models/counter.model.js'
import { isValidObjectId } from 'mongoose'

export const createReading = catchAsync(async (req, res, next) => {
    let { counter_id, energy_day, energy_night } = req.body
    if (!isValidObjectId(counter_id))
        return next(new AppError(400, 'Please provide valid id'))

    const counter = await Counter.findById(counter_id)
    if (!counter)
        return next(new AppError(400, 'No counter with provided id found'))

    const prevReading = (await Reading.find().sort('-createdAt').limit(1))[0]

    if (energy_day < prevReading.energy_day)
        energy_day = prevReading.energy_day + counter.penalty_day

    if (energy_night < prevReading.energy_night)
        energy_night = prevReading.energy_night + counter.penalty_night

    const reading = await Reading.create({
        counter_id,
        energy_day,
        energy_night,
        to_pay:
            (energy_day - prevReading.energy_day) * counter.tariff_day +
            (energy_night - prevReading.energy_night) * counter.tariff_night,
    })

    res.status(201).json({ status: 'success', data: reading })
})
