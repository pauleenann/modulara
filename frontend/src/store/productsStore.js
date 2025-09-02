import api from "@/utils/api";
import { defineStore } from "pinia";

export const productsStore = defineStore('products',{
    state: ()=>({
        loading: false,
        products: [],
        searchQuery: 'All Products'
    }),

    actions:{
        async getProducts (query){
            try {
                this.loading = true
                const response = await api.get("/products",{
                    params: {
                        search: query || ''
                    }
                });
                console.log('Response from API:', response.data);
    
                setTimeout(()=>{
                    this.searchQuery = query==''||!query ? 'All Products' : query;
                    this.products = response.data.products;
                    this.loading = false;
                    console.log('Products after delay:', this.products);
                },3000)
            } catch (error) {
                console.log('An error occurred: ', error);
                this.loading = false;
            }
        },


    }
})