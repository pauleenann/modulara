import api from "@/utils/api";

export const getProducts = async (query, page)=>{
    try {
        console.log('page',page)
        const {data} = await api.get("/products",{
            params: {
                search: query || '',
                page,
                limit: 3
            }
        });
        console.log(data);
        return {
            products: data.products,
            nextCursor: data.nextCursor
        }
    } catch (error) {
        console.log(error)
    }
}

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