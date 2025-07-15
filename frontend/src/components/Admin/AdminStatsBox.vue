<script setup>
    const props = defineProps({
        title: String,
        total: Number,
        icon: String,
        hexColor: String
    })
</script>

<template>
    <div class="w-[256px] h-[121px] bg-white rounded-2xl shadow-sm flex items-center ps-8 gap-5 transition delay-100 duration-300 cursor-pointer hover:bg-gray-100">
        <!-- icon -->
        <div 
            class="h-15 w-15 rounded-full flex items-center justify-center text-white text-2xl"
            :style="{ backgroundColor: props.hexColor }"
        >
            <i :class="props.icon"></i>
        </div>

        <!-- box label and number -->
        <div class="font-dm-sans">
            <p class="text-[var(--color-light-gray)] font-medium">{{ props.title }}</p>
            <p class="text-2xl text-[var9--color-gray] font-bold">{{props.total}}</p>
        </div>
    </div>
</template>