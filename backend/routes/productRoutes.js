import express from 'express';
import { addProduct, getProducts } from '../controllers/productController.js';
import upload from '../middleware/cloudinaryUploader.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// upload array tells multer to store every image with 'images' as name in a specific storage
router.get(
    '/',
    authenticate,
    authorize('admin', 'customer'),
    getProducts
);
router.post(
    '/', 
    authenticate, 
    authorize('admin'),
    upload.array('images'), 
    addProduct
);

export default router;