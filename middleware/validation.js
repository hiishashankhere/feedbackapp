import Joi from "joi";

export const validator = (req, res, next) => {
    const { name, email, password } = req.body
    const userInfo = {
        name, email, password
    }
    const schema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = schema.validate(userInfo, { abortEarly: false })
    if (error) {
        res.status(404).json({
            success: false,
            message: error.details[0].message
        })
    }
    else 
    {
        next()
    }
}