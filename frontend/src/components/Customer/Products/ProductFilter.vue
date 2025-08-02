<script setup>
    import { filters } from '@/constants/constants';
</script>

<template>
    <div class="w-full grid grid-cols-7 gap-3">
        <button 
        v-for="(filter, index) in filters"
        :key="index"
        class="border border-[#D9D9D9] text-[var(--color-gray)] rounded py-2 px-4 transition duration-300 ease-in-out hover:bg-[#D9D9D9] cursor-pointer font-dm-sans">
            {{ filter }}
        </button>
    </div>
</template>