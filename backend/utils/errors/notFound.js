import AppError from './AppError.js'
import catchAsync from './catchAsync.js'

export default catchAsync(async (req, res, next) => {
    next(new AppError(404, 'Page not found'))
})
