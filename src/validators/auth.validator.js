import { body, validationResult } from "express-validator";

export const registerValidator = [
    body("email")
        .exists().withMessage("emial is required").bail()
        .trim()
        .isEmail().withMessage("Enter valid email address"),

    body("name")
        .exists().withMessage("name is required").bail()
        .trim()
        .isString().withMessage("Must be a string")
        .isLength({min: 2, max: 50}).withMessage("Name length must be between 2-50 cherecters."),

    body("password")
        .exists().withMessage("password is required.").bail()
        .isString().withMessage("password must be a string")
        .trim()
        .isLength({min: 6}).withMessage("password at least 6 cherecter long."),

    (req, res, next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid Request.",
                errors: errors.array()
            })
        }
        next()
    }

]


export const loginValidator = [
    body("email")
        .exists().withMessage("Email is requird.").bail()
        .isString().withMessage("Email must be string value").bail()
        .trim()
        .isEmail().withMessage("Enter a vaild email address"),
    body("password")
        .exists().withMessage("password is requires.")
        .isString().withMessage("password must be a string value.")
        .trim()
        .isLength({min: 6}).withMessage("password at least 6 cherecter long."),
    
    (req, res, next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid data",
                errors: errors
            })
        }
        next()
    }
]