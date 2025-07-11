<script setup>
    import CategoryPill from './CategoryPill.vue';
    import Product from './Product.vue';
</script>

<template>
    <section class="w-5/6 h-auto pb-45 flex flex-col justify-center items-end gap-4 m-auto">
        <!-- category title-->
        <CategoryPill category="Our Bestsellers" />

        <!-- header -->
        <h2 class="text-5xl text-end text-[var(--color-gray)] font-extralight font-dm-sans">Discover the sofas our customers can’t stop<br/>talking about — <span class="font-bold">comfort, style, and modular<br/>design at their best.</span></h2>

        <!-- bestsellers -->
        <div class="w-full h-auto grid grid-cols-3 gap-x-7 gap-y-10  mt-10">
            <Product v-for="index in 6" :key="index"/>
        </div>
        
    </section>
</template>