import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCartDetails = async (req, res)=>{
    try {
        console.log('this is cart details');
        const ids = req.query['ids[]'];
        console.log(ids)
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

export const getUserCart = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log('id: ',id)

        const cart = await Cart.findOne({userId: id})
        
        return res.status(200).json({
            cart,
            message: "Cart successfully fetched."
        })
    } catch (error) {
        console.error('Failed getting cart', error);
        return res.status(500).json({ error: error });
    }
}

export const addItemToCart = async (req, res)=>{
    try {
        console.log(req.body)
        const {id, productData} = req.body;

        // check first if user exists
        const userExists = await Cart.findOne({
            userId: id
        })

        // if user does not exist, create cart
        if(!userExists){
            await Cart.create({
                userId: id,
                items: productData
            })
        }else{
            // check first if user already added the item, if already added, increase quantity
            const itemExists = await Cart.findOneAndUpdate(
                {userId: id, "items.variant": productData.variant},
                {$inc: { "items.$.quantity": productData.quantity}} // The $ is a positional operator — it refers to the first array element that matched the condition.
            )

            // if item is not added yet, add the item to the cart
            if(!itemExists){
                await Cart.findOneAndUpdate(
                    { userId: id },
                    { $push: { items : productData } },
                )
            }
        }
        
        return res.status(200).json({
            message: 'Item added to cart successfully'
        })
    } catch (error) {
        console.error('Failed adding item to cart', error);
        return res.status(500).json({ error: error });
    }
}