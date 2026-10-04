import { Router } from "express";
import { createProductValidator } from "../validators/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProduct, listAllProducts, unlistProduct, listProduct, listAllProductsToSeller } from "../controller/product.controller.js"
import multer from "multer";


const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        files: 5, // only accept 5 files
        fileSize: 5 * 1024 * 1024 // (5MB/image)
    }
    // fileFilter to accept files of specific file like image, pdf ....
})


const router = Router()

// @method POST
// @route - /api/products/
// @description creates the product and save its data into the DB, Images will be store on imagekit.
// req.body => {title, description, price:{amount, currency}, sizes:[{size, stock}...]}


router.post("/", authenticate, (req, res, next)=>{
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message: "User is not autherize to create products"
        })
    }
    next()
}, upload.array("images"), (req, res, next)=>{

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))
    next()
}, createProductValidator, createProduct)

/**
 * @method GET
 * @route /api/product
 * @description Read all the published products from the DB
 * @access user
 */


router.get("/", authenticate, listAllProducts)


/**
 * @method GET
 * @route /api/product/seller
 * @description Read all the products from the DB
 * @access seller
 */
router.get("/seller", authenticate, authenticateSeller, listAllProductsToSeller)


/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description Unlist a product by its ID
 * @access seller
 */
router.patch("/unlist/:id", authenticate, authenticateSeller, unlistProductValidator, unlistProduct)


/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description list a product by its ID
 * @access seller
 */
router.patch("/unlist/:id", authenticate, authenticateSeller, listProductValidator, listProduct)


export default router