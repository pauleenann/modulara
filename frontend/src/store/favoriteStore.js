import { defineStore } from "pinia";
import { authStore } from "./authStore";
import { getFavorites, saveFavorites } from "@/services/favorites";

export const favoriteStore = defineStore('favorite',{
    state: ()=>({
        favorites: [],
    }),

    actions: {
        async getFaves(){
            console.log('getting your faves')
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;
            console.log('isAuthenticated: ', store.isAuthenticated)

            if(!isAuthenticated){
                this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            }else{
                try {
                    let {id} = store.user;
                    const response = await getFavorites(id)
                    this.favorites = response.data.favorites;
                } catch (error) {
                    console.log(error)
                }
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
            }else{

            }
        },

        isFavorite(id){
            return this.favorites.includes(id)
        },

        async saveFaves(userId){
            //don't save if this.favorites is empty
            if(this.favorites.length==0) return

            try {
                await saveFavorites(userId, this.favorites)

                localStorage.removeItem('favorites')

            } catch (error) {
                console.log('Cannot save favorites to database: ', error)
            }
        }
    }
})