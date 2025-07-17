import express from 'express';
import { addProduct } from '../controllers/productController.js';
import upload from '../middleware/cloudinaryUploader.js';

const router = express.Router();

// upload array tells multer to store every image with 'images' as name in a specific storage
router.post('/', upload.array('images'), addProduct);

export default router;