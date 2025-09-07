import api from "@/utils/api";

export const getProducts = async (query, page)=>{
    try {
        console.log('page',page)
        const {data} = await api.get("/products",{
            params: {
                search: query || '',
                page,
                limit: 2
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