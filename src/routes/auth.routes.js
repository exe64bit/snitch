import { Router } from "express";
import {registerValidator} from "../validators/auth.validator.js"
import {register} from "../controller/auth.controller.js"

const router = Router()


// @POST /api/auth/register
// name, emai, password
// res.status = 201 if success

router.post("/register", registerValidator, register)


export default router