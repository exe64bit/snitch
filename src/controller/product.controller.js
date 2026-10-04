import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js";


export async function createProduct(req, res) {
    // console.log(req.body);
    // console.log(req.files);

    const fileUrls = []

    for(let i= 0; i<req.files.length; i++){
        const responce = await uploadFile({
            buffer: req.files[i].buffer,
            fileName: req.files[i].originalname
        })
        
        fileUrls.push(responce.url)
    }

    // console.log(fileUrls);

    const product = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        price: {
            amount: req.body.price.amount,
            currency: req.body.price.currency
        },
        sizes: req.body.sizes,
        images: fileUrls,
        seller: req.user.userId
    })
    

    res.status(201).json({
        msg: "Product created successfully.",
        data: {
            product
        }
    })   
}

export async function listAllProducts(req, res) {
    const products = await productModel.find()

    res.status(200).json({
        message: "Products data fetched successfully",
        data: {
            products
        }
    })
}

export async function listAllProductsToSeller(req, res) {

    const products = await productModel.find({})

    return res.status(200).json({
        message: "All products fetched successfully",
        data: {
            products
        }
    })
}

export async function unlistProduct(req, res) {

    const { id } = req.params

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "product not found by id"
        })
    }

    // –––––––––––––––––– make product unPublished –––––––––––––––––––––
    await productModel.findByIdAndUpdate(id, {
        published: false
    })

    return res.status(200).json({
        message: "Product unpublished successfully"
    })

}


export async function listProduct(req, res) {

    const { id } = req.params

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "product not found by id"
        })
    }

    // –––––––––––––––––– make product unPublished –––––––––––––––––––––
    await productModel.findByIdAndUpdate(id, {
        published: true
    })

    return res.status(200).json({
        message: "Product published successfully"
    })
}