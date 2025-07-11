<script setup>
    const prop = defineProps({
        category: Object
    })
</script>

<template>
    <div
         class="w-full h-100 lg:h-full bg-cover bg-center relative rounded overflow-hidden"
        :style="`background-image: url(${prop.category.img})`"
    >
        <div class="absolute bottom-0 w-full text-white font-dm-sans p-8 bg-black/15 backdrop-blur-sm">
            <h3 class="text-3xl lg:text-4xl font-light">{{ prop.category.category }}</h3>
            <p class="text-xl font-light">{{ prop.category.description }}</p>
        </div>
    </div>
</template>