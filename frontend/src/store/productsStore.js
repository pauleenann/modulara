import api from "@/utils/api";
import { defineStore } from "pinia";

export const productsStore = defineStore('products',{
    state: ()=>({
        loading: false,
        products: []
    }),

    actions:{
        async getProducts (){
            try {
                this.loading = true
                const response = await api.get("/products/");
                if(response.data.products.length==0){
                    console.log('No products available')
                    return 
                }
    
                setTimeout(()=>{
                    this.products = response.data.products;
                    this.loading = false;
                },3000)
                
                console.log(this.products)
            } catch (error) {
                console.log('An error occurred: ', error);
                this.loading = false;
            }
        }
    }
})