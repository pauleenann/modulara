<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Product from '@/components/Customer/Home/Product.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import { RouterLink } from 'vue-router';
    import { productsStore } from '@/store/productsStore';
    import { onMounted, ref } from 'vue';

    const store = productsStore();
    
    onMounted(()=>{
        store.getProducts();
    })
</script>

<template>
    <div class="w-screen h-screen ">
        <ProductNavbar/>
        
        <div class="absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <div class="w-5/6 m-auto flex flex-col items-center mb-20">
                <!-- filter -->
                <ProductFilter/>

                <!-- loading -->

                <!-- result text and sort button -->
                <div class="mt-13 flex justify-between items-end font-dm-sans w-full">
                    <div>
                        <h1 class="text-2xl lg:text-4xl capitalize">{{ store.searchQuery }}</h1>
                        <p>Showing 1 of 100 results</p>
                    </div>

                    <button 
                    class="border border-[#D9D9D9] text-[var(--color-gray)] rounded py-2 px-3 transition duration-300 ease-in-out hover:bg-[#D9D9D9] cursor-pointer font-dm-sans">
                      <i class="fa-solid fa-filter block md:hidden"></i>
                    </button>
                </div>

                <!-- products -->
                <div 
                v-if="store.loading"
                class="w-full h-auto grid lg:grid-cols-3 gap-x-7 gap-y-10 mt-10">
                    <Product 
                    class="product"
                    v-for="index in 6"
                    :key="index"
                    :product="null"/>
                </div>
                <div 
                v-else
                class="w-full h-auto grid lg:grid-cols-3 gap-x-7 gap-y-10 mt-10">
                    <Product 
                    class="product" 
                    v-for="product in store.products"
                    :key="product._id"
                    :product="product"/>
                </div>

                <div 
                v-if="!store.loading && store.products.length==0"
                class="h-70 flex flex-col justify-center items-center">
                    <i class="fa-solid fa-face-sad-tear text-4xl mb-2"></i>
                    <p class="font-medium ">No products available.</p>
                    <p class="text-gray-500 font-medium">Please try a different search.</p>
                </div>

                <!-- show more -->
                <button 
                v-if="store.products.length>0"
                class="my-25 text-[var(--color-gray)] cursor-pointer">
                    Show more
                </button>
            </div>  

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>