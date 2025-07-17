import express from 'express';
import { addProduct } from '../controllers/productController.js';
import upload from '../middleware/cloudinaryUploader.js';

const router = express.Router();

router.post('/', upload.array('images'), addProduct);

export default router;