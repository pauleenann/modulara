import api from "@/utils/api"

// get cart details
export const getCartDetails = async (ids)=>{
    return await api.get('/cart/details', {
        params: { ids }
    })
}

// save cart from localstorage to db
export const saveCart = async (userId, cart)=>{
    return await api.post('/cart/save',{
        userId,
        cart
    })
}

// get cart of user
export const getCart = async (userId)=>{
    // console.log(userId)
    return await api.get(`/cart/${userId}`);
}

// save/push added item to db when user is authenticated
export const saveItemToDB = async (id, productData)=>{
    return await api.post(`/cart/add`,{
        id,
        productData
    })
}

// decrease quantity
export const removeFromCart = async (id, productData)=>{
    return await api.put(`/cart/remove`,{
        id, 
        productData
    })
}