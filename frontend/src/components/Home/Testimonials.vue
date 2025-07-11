<script setup>
    import CategoryPill from './CategoryPill.vue';
import Testimonial from './Testimonial.vue';

</script>

<template>
    <section class="w-full h-auto col-center py-40 px-10 lg:p-45 gap-3">
        <!-- header -->
        <CategoryPill category="Testimonials"/>
        <h2 class="font-dm-sans font-light text-5xl lg:text-7xl text-[var(--color-gray)] text-center">What They Say About Us</h2>

        <!-- testimonials -->
        <div class="mt-5 lg:mt-20 flex items-center gap-5">
            <Testimonial v-for="index in 5" :key="index"/>
        </div>
    </section>
</template>