<script setup>
import CategoryPill from './CategoryPill.vue';

</script>

<template>
    <section class="w-full h-auto flex flex-col gap-8">
        <!-- about content -->
        <div class="w-5/6 m-auto flex flex-col items-start gap-2">
            <CategoryPill category="About Modulara" />
            <h2 class="font-dm-sans font-light text-6xl lg:text-7xl text-[var(--color-gray)]">Modulara</h2>
            <p class="font-dm-sans font-light text-xl lg:text-2xl lg:w-[50%]">At Modulara, we design premium modular sofas that evolve with your lifestyle. Blending modern aesthetics with everyday comfort, our pieces are built to last, easy to customize, and crafted to fit seamlessly into any space. Whether you're furnishing a new home or refreshing your style, Modulara makes it effortless to shape your space—beautifully.</p>
        </div>

        <!-- about image -->
        <div class="w-full h-100 lg:h-[700px] bg-red-100 bg-[url('images/about.png')] bg-cover bg-bottom">

        </div>
    </section>
</template>