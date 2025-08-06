import admin from "../config/firebase-admin.js";
import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
  try {
    // destructure product fields
    const {
      name,
      description,
      category,
      price,
      totalQuantity,
      variants,
      features,
      measurements
    } = req.body;

    // parse JSON fields safely
    const parsedVariants = JSON.parse(variants || '[]');
    const parsedFeatures = JSON.parse(features || '[]');
    const parsedMeasurements = JSON.parse(measurements || '{}');

    const imageUrls = req.files?.map(file => file.path) || [];

    // create product
    await Product.create({
      name,
      description,
      category,
      price,
      totalQuantity,
      attributes: {
        variants: parsedVariants,
        features: parsedFeatures,
        measurements: parsedMeasurements
      },
      images: imageUrls
    });

    return res.status(201).json({ message: 'Product added' });

  } catch (error) {
    console.error('Add Product Error:', error);
    return res.status(500).json({ error: error });
  }
};
