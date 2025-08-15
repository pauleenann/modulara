import express from 'express';
import { getCartDetails } from '../controllers/cartController.js';

const router = express.Router();

router.get(
    '/details',
    getCartDetails
)

export default router;