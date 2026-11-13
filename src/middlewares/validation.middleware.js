import {validationResult} from 'express-validator'

export const validateResult = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            succes: false,
            errors: errors.array().map((e) => ({
                field: e.path,
                message: e.msg
            }))
        })
    }
    next()
}