import express from 'express';
import { addItemToCart, getCartDetails, getUserCart, saveCartDetails } from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.get(
    '/details',
    getCartDetails
);
router.get(
    '/:id',
    authenticate,
    authorize('customer'),
    getUserCart
);
router.post(
    '/save',
    authenticate,
    authorize('customer'),
    saveCartDetails
);
router.post(
    '/add',
    authenticate,
    authorize('customer'),
    addItemToCart
)
export default router;