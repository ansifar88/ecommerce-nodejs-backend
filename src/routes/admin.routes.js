import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import adminAuthRouter from '../modules/admin/auth/auth.routes.js'
import categoryRouter from '../modules/admin/category/category.routes.js'

const adminRouter = express.Router()

adminRouter.use('/auth',adminAuthRouter)

adminRouter.use(authenticate(['admin']))

adminRouter.use('/category',categoryRouter)

export default adminRouter