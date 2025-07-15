import mongoose, { model, Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ['3-Seater Sofa', 'Sectional', 'Loveseat', 'Modular Chaise'],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    ratings:{
        type: Number,
        default: 0
    },
    totalQuantity:{
        type: Number,
        required: true
    },
    totalSold:{
        type: Number,
        default: 0
    },
    attributes:{
        colorOptions: {
            color: String,
            quantity: Number
        },
        features: [String],
        measurement:{
            overallWidth: String,
            depth: String,
            height: String,
            seatHeight: String,
            seatDepth: String,
            armHeight: String,
            legHeight: String
        }
    },
    images: [String],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Product = model('Product', ProductSchema)
export default Product