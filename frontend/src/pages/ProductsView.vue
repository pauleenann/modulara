<script setup>
    import ProductNavbar from '@/components/Customer/Home/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Home/ProductFilter.vue';
    import Product from '@/components/Customer/Home/Product.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
</script>

<template>
    <div class="w-screen h-screen ">
        <ProductNavbar/>
        
        <div class="absolute top-35 left-0 right-0 m-auto">
            <div class="w-5/6 m-auto flex flex-col items-center mb-20">
                <!-- filter -->
                <ProductFilter/>

                <!-- result text and sort button -->
                <div class="mt-13 flex justify-between items-end font-dm-sans w-full">
                    <div>
                        <h1 class="text-4xl">New Arrivals</h1>
                        <p>Showing 1 of 100 results</p>
                    </div>

                    <button 
                    class="border border-[#D9D9D9] text-[var(--color-gray)] rounded py-2 px-5 transition duration-300 ease-in-out hover:bg-[#D9D9D9] cursor-pointer font-dm-sans">
                        Sort by
                    </button>
                </div>

                <!-- products -->
                <div class="w-full h-auto grid lg:grid-cols-3 gap-x-7 gap-y-10  mt-10">
                    <Product v-for="index in 6" :key="index" class="product"/>
                </div>

                <!-- show more -->
                <button class="my-25 text-[var(--color-gray)] cursor-pointer">
                    Show more
                </button>
            </div>  

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>