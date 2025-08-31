import express from 'express';
import { addItemToCart, getCartDetails, getUserCart, removeItemFromCart, saveCartDetails } from '../controllers/cartController.js';
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
);
router.put(
    '/remove',
    authenticate,
    authorize('customer'),
    removeItemFromCart
)
export default router;