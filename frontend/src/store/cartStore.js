import { toastNotification } from "@/utils/products/toastNotification";
import { authStore } from "./authStore";
import { defineStore } from 'pinia';
import { getCart, removeFromCart, removeItem, saveCart, saveItemToDB } from "@/services/cart";

export const cartStore = defineStore('cart', {
    state: () => ({
        cart: [],
    }),

    getters: {
      cartTotal: (state) => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      }
    },    

    actions: {
        async getCart(){
          // get authentication status
          const store = authStore();
          const isAuthenticated = store.isAuthenticated;
          const user = store.user;
          
          if(!isAuthenticated){
            this.cart = JSON.parse(localStorage.getItem('cart')) || []
          }else{
            try {
              const response = await getCart(user.id);
              console.log(response)
              this.cart = response.data.cart.items;
            } catch (error) {
              console.log('Cannot get cart. An error occurred: ', error)
            }
          }
        }, 

        async addToCart(productData, productName='Product', toast = false) {
            // get authentication status
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;

            // this.basket.find(...) returns a reference to the actual object in this.basket, so changing existing changes the original data in the array immediately.
            const existing = this.cart.find(
              item => item.productId === productData.productId && item.variant === productData.variant
              );

              if (existing) {
                existing.quantity += productData.quantity;
              } else {
                this.cart.push({ ...productData });
              }
          
            if (!isAuthenticated) {
              // save to local storage
              localStorage.setItem('cart', JSON.stringify(this.cart));

              // display toast
              toast&&toastNotification(`${productName} added to cart`, 'success')
            } else {
              try {
                const {id} = store.user;
                const response = await saveItemToDB(id, productData);
                
                // display toast
                toast&&toastNotification(`${productName} added to cart`, 'success')
              } catch (error) {
                console.log('Cannot add cart to DB. An error occurred: ', error )

                // display toast
                toast&&toastNotification(`${productName} failed to add to cart`, 'warning')
              }
            }

            //add total
            this.totalItems++
        },

        // for decreasing
        async removeFromCart(productData){
          // get authentication status
          const store = authStore();
          const isAuthenticated = store.isAuthenticated;
          const {id} = store.user;

          const existing = this.cart.find(item=> productData.productId == item.productId && productData.variant == item.variant)

          if(existing){
            if(existing.quantity>1){
              existing.quantity--;
            }else{
              this.cart = this.cart.filter(item=>item.productId!=existing.productId)
            }
            this.totalItems--; //decrement totalItems  
          }

          // update db or localstorage
          if(!isAuthenticated){
            localStorage.setItem('cart', JSON.stringify(this.cart));
          }else{
            try {
              const response = await removeFromCart(id, productData)
            } catch (error) {
              console.log("Cannot decrease quantity")
            }
          }
        },

        async removeProduct(productId){
          // get authentication status
          const store = authStore();
          const isAuthenticated = store.isAuthenticated;
          const {id} = store.user;

          this.cart = this.cart.filter(item=>item.productId!=productId)

          // update db or localstorage
          if(!isAuthenticated){
            localStorage.setItem('cart', JSON.stringify(this.cart));
          }else{
            try {
                await removeItem(id, productId)
            } catch (error) {
              console.log('Cannot remove product from cart. An error occurred: ', error)
            }
          }
        },

        async saveCart(userId){
          if(this.cart.length==0) return; //return if cart is empty 
            try {
              const response = await saveCart(userId, this.cart);
              
              // delete from localstorage
              localStorage.removeItem('cart');
            } catch (error) {
              console.log('Cannot save cart. An error occurred: ', error)
            }
        }
    },
});
