import api from "@/utils/api"

export const getCartDetails = async (ids)=>{
    return await api.get('/cart/details', {
        params: { ids }
    })
}

export const saveCart = async (userId, cart)=>{
    return await api.post('/cart',{
        userId,
        cart
    })
}