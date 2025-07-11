<script setup> 
    import { navbarMenu } from '@/constants/constants'
    import { iconMenu } from '@/constants/constants';
    import { RouterLink } from 'vue-router';
    
</script>

<template>
    <nav class="w-5/6 m-auto h-25 grid grid-cols-2 lg:grid-cols-3 items-center absolute left-0 right-0 top-8">
        <!-- logo -->
        <span class="text-white font-semibold text-3xl font-kulim-park">Modulara</span>

        <!-- navbar -->
        <ul class="hidden lg:flex items-center gap-8 text-white m-auto font-dm-sans pt-3">
            <li 
                v-for="(menu, index) in navbarMenu"
                :key="index"
                class="text-lg"
            >
                {{ menu.name }}
            </li>
        </ul>

        <!-- icon menu -->
        <ul class="hidden lg:flex items-center gap-3 text-white justify-end">
            <li 
                v-for="(menu, index) in iconMenu"
                :key="index"
            >
                <RouterLink :to="menu.path">
                    <i :class="['text-xl',menu.icon]"></i>
                </RouterLink>
            </li>
        </ul>

        <!-- mobile menu -->
        <button class="block lg:hidden text-end text-white">
            <i class="fa-solid fa-bars"></i>
        </button>
    </nav>
</template>