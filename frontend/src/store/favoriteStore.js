import { defineStore } from "pinia";
import { authStore } from "./authStore";

export const favoriteStore = defineStore('favorite',{
    state: ()=>({
        favorites: [],
    }),

    actions: {
        async getFaves(){
            const store = authStore;
            const isAuthenticated = store.isAuthenticated;

            if(!isAuthenticated){
                this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            }
        },

        async addToFaves(productData, productName = "Product", toast=false){
            //get authentication status
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;

            //push productData to this.favorites
            this.favorites.push(productData)

            console.log('This is the favorites store')
            console.log(productData)
            if(!isAuthenticated){
                localStorage.setItem('favorites', JSON.stringify(this.favorites))
            }
        },

        isFavorite(id, variant){
            //SOME METHOD
            // It returns true if any item matches.
            // It returns false if no items match.
            return this.favorites.some(
                f => f.productId === id && f.variant === variant
            )
        }
    }
})