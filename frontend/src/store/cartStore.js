import { toastNotification } from "@/utils/products/toastNotification";
import { authStore } from "./authStore";
import { defineStore } from 'pinia';

export const cartStore = defineStore('cart', {
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    }),

    getters: {
      cartTotal: (state) => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      }
    },    

    actions: {
        async addToCart(productData, productName='Product') {
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;
          
            // this.basket.find(...) returns a reference to the actual object in this.basket, so changing existing changes the original data in the array immediately.
            const existing = this.cart.find(
              item => item.productId === productData.productId && item.variant === productData.variant
            );

            console.log(existing)
          
            if (existing) {
              existing.quantity += productData.quantity;
            } else {
              this.cart.push({ ...productData });
            }

            //add total
            this.totalItems++
          
            if (!isAuthenticated) {
              localStorage.setItem('cart', JSON.stringify(this.cart));
              toastNotification(`${productName} added to cart`, 'success')
            } else {
              // API call to save to backend
            }
        },

        async incrementQuantity(){
          
        }

    },
});
