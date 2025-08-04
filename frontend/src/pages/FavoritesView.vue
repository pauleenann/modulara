<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Product from '@/components/Customer/Home/Product.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import { RouterLink } from 'vue-router';
    import OtherProducts from '@/components/Customer/Products/OtherProducts.vue';

</script>

<template>
    <div class="w-screen h-screen ">
        <ProductNavbar/>
        
        <div class="absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <div class="w-5/6 m-auto flex flex-col items-center mb-20">
                <!-- filter -->
                <ProductFilter/>

                <!-- result text and sort button -->
                <div class="mt-13 flex justify-between items-end font-dm-sans w-full">
                    <div>
                        <h1 class="text-2xl lg:text-4xl">Your Favorites</h1>
                        <p>100 products in total</p>
                    </div>

                    <button 
                    class="border border-[#D9D9D9] text-[var(--color-gray)] rounded py-2 px-3 transition duration-300 ease-in-out hover:bg-[#D9D9D9] cursor-pointer font-dm-sans">
                      <i class="fa-solid fa-filter block md:hidden"></i>
                    </button>
                </div>

                <!-- products -->
                <div class="w-full h-auto grid lg:grid-cols-3 gap-x-7 gap-y-10 mt-10">
                    <RouterLink to="/shop/product" v-for="index in 6" :key="index">
                        <Product  class="product"/>
                    </RouterLink>
                </div>

                <!-- show more -->
                <button class="my-25 text-[var(--color-gray)] cursor-pointer">
                    Show more
                </button>

                <!-- other products -->
                <OtherProducts/>
            </div>  

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>