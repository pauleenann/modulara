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