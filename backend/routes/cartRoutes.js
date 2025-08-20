import express from 'express';
import { getCartDetails, getUserCart, saveCartDetails } from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.get(
    '/details',
    getCartDetails
);
router.post(
    '/',
    authenticate,
    authorize('customer'),
    saveCartDetails
)
router.get(
    '/:id',
    authenticate,
    authorize('customer'),
    getUserCart
)

export default router;