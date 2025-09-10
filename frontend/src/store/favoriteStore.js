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

        async addToFaves(id, productName = "Product", toast=false){
            //get authentication status
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;

            //push productData to this.favorites
            this.favorites.push(id)

            if(!isAuthenticated){
                localStorage.setItem('favorites', JSON.stringify(this.favorites))
            }
        },

        async removeToFaves(id){
            console.log(id)
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;

            console.log(this.favorites)
            // find and remove the product in this.favorites
            this.favorites = this.favorites.filter(f=>
                f != id
            )

            if(!isAuthenticated){
                localStorage.setItem('favorites',JSON.stringify(this.favorites))
            }
        },

        isFavorite(id){
            return this.favorites.includes(id)
        }
    }
})