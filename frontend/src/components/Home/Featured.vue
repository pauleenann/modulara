<script setup>
    import CategoryPill from './CategoryPill.vue';
    import FeaturedCategory from './FeaturedCategory.vue'
    import { featuredCategories } from '@/constants/constants';

</script>

<template>
    <section class="w-5/6 h-auto py-45 flex flex-col justify-center items-start gap-4 m-auto">
        <!-- category title-->
        <CategoryPill category="Featured Categories" />

        <!-- header -->
        <h2 class="text-5xl text-[var(--color-gray)] font-extralight font-dm-sans">Tailored for your lifestyle — shop our <br/>modern, <span class="font-bold">modular sofa collection.</span></h2>

        <!-- categories -->
        <div class="grid grid-cols-2 w-full h-screen mt-4 gap-4">
            <!-- first category (first column) -->
            <FeaturedCategory :category="featuredCategories[0]"/>

            <!-- 2nd and 3rd category -->
            <div class="flex flex-col gap-4">
                <FeaturedCategory :category="featuredCategories[1]"/>
                <FeaturedCategory :category="featuredCategories[2]"/>
            </div>
        </div>
    </section>
</template>