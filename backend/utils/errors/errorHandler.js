import AppError from './AppError.js'

export default (err, req, res, next) => {
    if (err.isCustom) return handleCustomError(err, res)
    if (err.code === 11000) handleDBError(err, res)
}

const handleCustomError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
}

const handleDBError = (err, res) => {
    handleCustomError(new AppError(400, 'Duplicate value found in DB'), res)
}
