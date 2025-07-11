<script setup>
    import Navbar from '../Navbar.vue';
    import { features } from '@/constants/constants';

</script>

<template>
    <section class="h-screen lg:h-[1200px] w-screen bg-[url('/images/home-bg.png')] bg-cover bg-right lg:bg-center relative">
        <!-- overlay -->
        <div class="absolute h-75 left-0 right-0 bottom-0 bg-gradient-to-t from-white/70 to-transparent"></div>
        <!-- navbar -->
        <Navbar/>

        <!-- quote and cta -->
        <div class="absolute top-75 lg:top-63 inset-0 text-center">
            <!-- header -->
            <h1 class=" text-white text-5xl lg:text-[115px] text-center font-thin mb-5 lg:text-sm/26">Redefine Comfort,<br/>One Module at a Time.</h1>

            <!-- button -->
            <button class="border border-white text-white p-4 rounded-xl mb-8 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 cursor-pointer font-dm-sans">
                Shop the Collection
            </button>
        </div>

        <!-- features -->
        <div class="hidden absolute bottom-0 left-0 right-0 w-5/6 m-auto lg:grid lg:grid-cols-3 py-10 gap-8">
            <div v-for="(feature, index) in features" :key="index" class="w-full h-full">
                <p class="text-xl lg:text-2xl text-[var(--color-gray)] font-semibold">{{ feature.title }}</p>
                <p class="text-md lg:text-xl text-[var(--color-gray)]">{{ feature.description }}</p>
            </div>
        </div>
    </section>
</template>