import api from "@/utils/api";
import { defineStore } from "pinia";

export const productsStore = defineStore('products',{
    state: ()=>({
        products: []
    }),

    actions:{
        async getProducts (){
            try {
                const response = await api.get("/products/");
                if(response.data.products.length==0){
                    console.log('No products available')
                    return 
                }
    
                this.products = response.data.products;
                console.log(this.products)
            } catch (error) {
                console.log('An error occurred: ', error);
            }
        }
    }
})