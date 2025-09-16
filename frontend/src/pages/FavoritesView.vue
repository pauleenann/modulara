<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Product from '@/components/Customer/Home/Product.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import { RouterLink } from 'vue-router';
    import OtherProducts from '@/components/Customer/Products/OtherProducts.vue';
    import { favoriteStore } from '@/store/favoriteStore';
    import {  useQuery } from '@tanstack/vue-query';
    import { storeToRefs } from 'pinia';
    import {  getFavoritesDetails } from '@/services/favorites';

    const storeFave = favoriteStore();
    const {favorites} = storeToRefs(storeFave); //make reactive
    
    //fetch product details
    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['favorites', favorites],
        queryFn: ()=>getFavoritesDetails(favorites.value), 
    })

</script>

<template>
    <div class="w-screen h-screen">
        <ProductNavbar/>
        
        <div class="absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <div class="w-5/6 m-auto flex flex-col items-center mb-20">
                <div 
                v-if="isLoading"
                class="w-full h-100 flex items-center justify-center font-medium">
                    Loading your favorites
                </div>

                <div
                class="my-15"
                v-else-if="data.length>0">
                <div
                    class="w-full grid grid-cols-3 gap-10">
                        <Product 
                        class="product" 
                        v-for="product in data"
                        :key="product._id"
                        :product="product"/>
                    </div>
                </div>

                <div
                class="mt-20 w-full h-100 flex items-center justify-center font-medium"
                v-else-if="data.length==0">
                    You have no favorites
                </div>

                <!-- other products -->
                <!-- <OtherProducts/> -->
            </div>  

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>