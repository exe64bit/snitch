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