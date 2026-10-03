import { Router } from "express";
import {registerValidator, loginValidator} from "../validators/auth.validator.js"
import {register, login, refresh, getMe} from "../controller/auth.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router()


// @POST /api/auth/register
// name, email, password
// res.status = 201 if success

router.post("/register", registerValidator, register)


// @POST /api/auth/login
// email, password
// res.status = 200 if success


router.post("/login", loginValidator, login)

// @POST /api/auth/refresh
// res.status = 200 if success

router.post("/refresh", refresh)

//@get /api/auth/me


router.get("/me", authenticate, getMe)

export default router