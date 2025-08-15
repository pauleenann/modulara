import api from "@/utils/api"

export const getCartDetails = async (ids)=>{
    return await api.get('/cart/details', {
        params: { ids }
    })
}