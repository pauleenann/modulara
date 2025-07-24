import express from "express";
import { refreshAccessToken, signInWithGoogle, testController } from "../controllers/authController.js";
import { authenticateFirebase } from "../middleware/firebaseAuth.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router()

router.post('/signin-google', authenticateFirebase, signInWithGoogle) //change endpoint
router.post('/test', authenticate, testController)
router.get('/refresh', refreshAccessToken)


export default router
