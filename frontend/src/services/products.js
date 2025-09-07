import api from "@/utils/api";

export const getProducts = async (query)=>{
    try {
        const {data} = await api.get("/products",{
            params: {
                search: query || ''
            }
        });
        console.log(data);
        return data.products
    } catch (error) {
        console.log(error)
    }
}