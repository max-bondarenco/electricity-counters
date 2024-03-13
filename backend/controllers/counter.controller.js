import catchAsync from '../utils/errors/catchAsync.js'
import Counter from '../models/counter.model.js'
import AppError from '../utils/errors/AppError.js'
import Reading from '../models/reading.model.js'
import { isValidObjectId } from 'mongoose'

export const createCounter = catchAsync(async (req, res, next) => {
    const { name, tariff_day, tariff_night, penalty_day, penalty_night } =
        req.body

    const counter = await Counter.create({
        name,
        tariff_day,
        tariff_night,
        penalty_day,
        penalty_night,
    })

    res.status(201).json({ status: 'success', data: counter })
})

export const getAllCounters = catchAsync(async (req, res, next) => {
    const sortQuery = req.query?.sort
        ?.split(' ')
        .reduce((acc, cur) => (acc += cur), '')

    const counters = await Counter.find().sort(sortQuery)
    res.status(200).json({ status: 'success', data: counters })
})

export const getCounterHistory = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (!isValidObjectId(id))
        return next(new AppError(400, 'Please provide valid id'))

    const counter = await Counter.findById(id)
    if (!counter)
        return next(new AppError(400, 'No counter with provided id found'))

    const history = await Reading.find({ counter_id: id }).sort('-createdAt')

    res.status(200).json({ status: 'success', data: history })
})

export const updateCounter = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (!isValidObjectId(id))
        return next(new AppError(400, 'Please provide valid id'))

    const counter = await Counter.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    })
    if (!counter)
        return next(new AppError(400, 'No counter with provided id found'))

    res.status(200).json({ status: 'success', data: counter })
})

export const deleteCounter = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (!isValidObjectId(id))
        return next(new AppError(400, 'Please provide valid id'))

    const counter = await Counter.findByIdAndDelete(id)
    if (!counter)
        return next(new AppError(400, 'No counter with provided id found'))

    res.status(200).json({ status: 'success' })
})
