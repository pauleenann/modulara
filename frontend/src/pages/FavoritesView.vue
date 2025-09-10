<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Product from '@/components/Customer/Home/Product.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import { RouterLink } from 'vue-router';
    import OtherProducts from '@/components/Customer/Products/OtherProducts.vue';
    import { favoriteStore } from '@/store/favoriteStore';
    import { onMounted } from 'vue';
    import { useQuery } from '@tanstack/vue-query';

    const storeFave = favoriteStore();
    const favorites = storeFave.favorites;

    // const {
    //     data,
    //     isLoading,
    //     isError
    // } = useQuery({
    //     queryKey: ['favorites',]
    // })

</script>

<template>
    <div class="w-screen h-screen ">
        <ProductNavbar/>
        
        <div class="absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <div class="w-5/6 m-auto flex flex-col items-center mb-20">
                <div class="w-full min-h-screen">

                </div>

                <!-- other products -->
                <!-- <OtherProducts/> -->
            </div>  

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>