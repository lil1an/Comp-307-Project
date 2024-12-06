import express from 'express'
const router = express.Router()

// import controllers
import { getTest } from '../controllers/test.js'

// import middlewares (if you have any)

// API routes
router.get('/test', getTest)

// Export the router using ES modules syntax
export default router
