import api from "@/utils/api"

export const getFavorites = async (ids)=>{
    try {
        console.log('getting faves')
        const {data} = await api.get('/products/favorites', {
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

export const saveFavorites = async(userId, favorites)=>{
    return await api.post('/products/favorites',{
        userId,
        favorites
    })
}