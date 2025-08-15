import { toastNotification } from "@/utils/products/toastNotification";
import { authStore } from "./authStore";
import { defineStore } from 'pinia';

export const basketStore = defineStore('basket', {
    state: () => ({
        basket: JSON.parse(localStorage.getItem('basket') || '[]')
    }),

    actions: {
        async addToBasket(productData, productName='Product') {
            const store = authStore();
            const isAuthenticated = store.isAuthenticated;
          
            // this.basket.find(...) returns a reference to the actual object in this.basket, so changing existing changes the original data in the array immediately.
            const existing = this.basket.find(
              item => item.productId === productData.productId && item.variant === productData.variant
            );

            console.log(existing)
          
            if (existing) {
              existing.quantity += productData.quantity;
            } else {
              this.basket.push({ ...productData });
            }
          
            if (!isAuthenticated) {
              localStorage.setItem('basket', JSON.stringify(this.basket));
              toastNotification(`${productName} added to basket`, 'success')
            } else {
              // API call to save to backend
            }
        },

        async getAddItemInfo(){

        }

    },
});
