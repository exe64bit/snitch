import { body, validationResult } from "express-validator";

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required.").bail()
        .isString().withMessage("title must be a string").bail()
        .trim()
        .isLength({min: 2, max: 100}).withMessage("title length must be betweent 2-100 cherecters.")
        .isAlpha("en-US", {ignore: " -"}).withMessage("title can only have english a-z/A-Z cherecters."),

    body("description")
        .exists().withMessage("Description is required.").bail()
        .isString().withMessage("Description must be string.").bail()
        .trim()
        .isLength({min: 20, max: 500}).withMessage("Description length must be between 20 to 500 cherecters.").bail(),

    body("price.amount")
        .exists().withMessage("price amount is required.").bail()
        .isFloat({min: 0}).withMessage("price amount must be a flating number and must be greterthen 0.").bail(),

    body("price.currency")
        .exists().withMessage("Currency is required.").bail()
        .isString().withMessage("Currency must be a string value.").bail()
        .isIn(["INR", "USD"]).withMessage("Currency either be INR or USD.").bail(),

    body("sizes")
        .exists().withMessage("Sizes are required.").bail()
        .isArray().withMessage("Sizes must be an array of object."),

    body("sizes.*.size")
        .exists().withMessage("Size must be prestn in every entryin sizes array.").bail()
        .isString().withMessage("Size must be in string.").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage(`Size can be one of those ["XS", "S", "M", "L", "XL", "XXL"]`),

    body("sizes.*.stock")
        .exists().withMessage("Size must be prestn in every entry of the sizes array.").bail()
        .isInt({min: 0}).withMessage("Stock must be a integer value."),

    (req, res, next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid requires.",
                errors: errors.array()
            })
        }

        next()
        
    }
]