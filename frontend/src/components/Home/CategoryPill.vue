<script setup>
    const prop = defineProps({
        category: String
    })
    
</script>

<template>
    <div class="text-md lg:text-xl text-[var(--color-gray)] font-dm-sans border border-[var(--color-gray)] py-2 px-5 rounded-4xl font-light">
        {{ prop.category }}
    </div>
</template>