import express from "express";
import signInWithGoogle from '../controllers/userController.js'

const router = express.Router()

router.post('/signin-google', signInWithGoogle) //change endpoint


export default router
