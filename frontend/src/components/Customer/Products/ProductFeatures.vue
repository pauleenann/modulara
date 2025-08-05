<script setup>
    const props = defineProps({
        features: Array
    })
</script>

<template>
    <div class="w-full pb-20">
        <h2 class="text-3xl lg:text-4xl font-dm-sans mb-5">Why You’ll Love It</h2>

        <!-- features -->
        <div 
        v-for="(feature,index) in props.features"
        :key="index"
        class="mt-2 flex items-center gap-3">
            <i class="fa-solid fa-check"></i>
            <p class="text-lg lg:text-xl">{{ feature }}</p>
        </div>
    </div>
</template>