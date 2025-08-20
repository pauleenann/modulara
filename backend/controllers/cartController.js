import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCartDetails = async (req, res)=>{
    try {
        console.log('this is cart details');
        const ids = req.query['ids[]'];
        const cartDetails = await Product.find({
            _id:{
                $in: ids
            }
        })

        return res.status(200).json({
            cartDetails,
            message:'Cart details fetched successfully'
        })
    } catch (error) {
        console.error('Fetching Cart Info Error:', error);
        return res.status(500).json({ error: error });
    }
}

export const saveCartDetails = async (req, res)=>{
    try {
        const {userId, cart} = req.body;

        console.log(userId, cart)
        // insert data
        const cartDetails = await Cart.create({
            userId: userId,
            items: cart
        })

        return res.status(201).json({ 
            cartDetails,
            message: 'Cart added' 
        });
    } catch (error) {
        console.error('Failed saving cart', error);
        return res.status(500).json({ error: error });
    }
}