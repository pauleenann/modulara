<script setup>
    import { adminSideMenu } from '@/constants/constants';
    import { useRoute } from 'vue-router';
    import { RouterLink } from 'vue-router';

    const route = useRoute();
    const currentUrl = route.name;
    console.log(currentUrl)
</script>

<template>
    <div class="w-full h-full pt-8">
        <!-- logo -->
        <h1 class="font-kulim-park text-white text-3xl font-bold ms-6">Modulara</h1>

        <!-- menu -->
        <ul class="mt-10">
            <li 
                v-for="(menu, index) in adminSideMenu" 
                :key ="index" 
            >
                <RouterLink 
                    :to="menu.path"
                    :class="[
                            'text-md grid grid-cols-[40px_1fr] items-center rounded-lg py-2 px-6',
                            currentUrl == menu.name 
                            ? 'bg-[#d9d9d9]/17 text-white' 
                            : 'text-[#d9d9d9]'
                        ]"
                >
                    <i :class="menu.icon"></i>
                    <span>{{ menu.name }}</span>
                </RouterLink>
                    
            </li>
        </ul>

    </div>
</template>