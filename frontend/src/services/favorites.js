import api from "@/utils/api"

export const getFavoritesDetails = async (ids)=>{
    try {
        console.log('getting faves')
        const {data} = await api.get('/products/favorites/details', {
            params: {
                ids
            }
        })

        console.log(data)
        return data.favoriteDetails
    } catch (error) {
        console.log(error)
    }
}

export const getFavorites = async(userId)=>{
    return await api.get('/products/favorites',{
        params:{
            userId
        }
    });
}

export const saveFavorites = async(userId, favorites)=>{
    return await api.post('/products/favorites',{
        userId,
        favorites
    })
}