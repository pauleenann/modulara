<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { navbarMenu } from '@/constants/constants'
    
    const props = defineProps({
        open: Boolean,
        close: Function,
        currentUrl: String
    })


</script>

<template>
    <div 
        :class="[
                'fixed inset-0 z-75 bg-white w-screen h-screen overflow-hidden py-13 px-8  transition-transform duration-300 ease-in-out',
                props.open ? 'translate-x-0' : 'translate-x-full'
        ]">
            <!-- exit button -->
            <div class="flex items-center justify-end gap-3 mb-20">
                <h2 class="font-bold font-kulim-park" >close</h2>
                <button @click="props.close"  class="">
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
                        props.currentUrl==menu.name?'text-[var(--color-gray)]':'text-[var(--color-light-gray)]'
                    ]"
                >
                    <RouterLink :to="menu.path" >
                        <span>{{ menu.name }}</span>
                    </RouterLink>
                </li>
            </ul>
    </div>
</template>