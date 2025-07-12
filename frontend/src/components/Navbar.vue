<script setup> 
    import { navbarMenu } from '@/constants/constants'
    import { iconMenu } from '@/constants/constants';
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useRoute } from 'vue-router';

    const isClicked = ref(false)
    const route = useRoute();
    const currentUrl = route.name;

    console.log(currentUrl)
    
</script>

<template>
    <div>
        <nav class="w-5/6 m-auto h-15 grid grid-cols-2 lg:grid-cols-3 items-center absolute left-0 right-0 top-8 lg:top-15">
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

            <!-- hamburger menu -->
            <button @click="isClicked=true" class="block lg:hidden text-end text-white">
                <i class="fa-solid fa-bars"></i>
            </button>
        </nav>

        <!-- mobile menu -->
        <div :class="[
                'fixed inset-0 z-75 bg-white w-screen h-screen overflow-hidden py-13 px-8  transition-transform duration-300 ease-in-out',
                isClicked ? 'translate-x-0' : 'translate-x-full'
        ]">
            <!-- exit button -->
            <div class="flex items-center justify-end gap-3 mb-20">
                <h2 class="font-bold font-kulim-park" >close</h2>
                <button @click="isClicked=false"  class="">
                    <i class="text-2xl fa-solid fa-xmark text-[var(--color-gray)]"></i>
                </button>
            </div>
            
            <!-- menu -->
            <ul class="w-full">
                <li 
                    v-for="(menu, index) in navbarMenu"
                    :key="index"
                    :class="[
                        'text-center text-2xl font-semibold p-3  hover:text-[var(--color-gray)] cursor-pointer transition duration-100 ease-in',
                        currentUrl==menu.name?'text-[var(--color-gray)]':'text-[var(--color-light-gray)]'
                    ]"
                >
                    <RouterLink :to="menu.path" >
                        <span>{{ menu.name }}</span>
                    </RouterLink>
                </li>
            </ul>
            <!-- icon menu -->
            <ul class="w-full">
                <li 
                    v-for="(menu, index) in iconMenu"
                    :key="index"
                    :class="[
                        'text-center text-2xl font-semibold p-3  hover:text-[var(--color-gray)] cursor-pointer transition duration-100 ease-in',
                        currentUrl==menu.name?'text-[var(--color-gray)]':'text-[var(--color-light-gray)]'
                    ]"
                >
                    <RouterLink :to="menu.path" >
                        <span>{{ menu.name }}</span>  
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>