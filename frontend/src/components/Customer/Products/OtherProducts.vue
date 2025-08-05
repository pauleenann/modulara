<script setup>
    import Product from '../Home/Product.vue';
</script>

<template>
    <div class="w-full pb-20">
        <h2 class="text-2xl lg:text-4xl font-dm-sans mb-5">Other Products You Might Love</h2>

        <!-- other -->
        <div class="flex flex-col lg:flex-row items-center justify-around gap-6 lg:gap-2">
            <Product 
            v-for="index in 3"
            :key="index"/>
        </div>
    </div>
</template>