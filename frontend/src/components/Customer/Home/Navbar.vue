<script setup> 
    import { navbarMenu } from '@/constants/constants'
    import { iconMenu } from '@/constants/constants';
    import Cart from './Cart.vue';
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useRoute } from 'vue-router';
    import MobileMenu from './MobileMenu.vue';
    import { handleIconClick } from '@/utils/iconMenuHandler';
    import { cartStore } from '@/store/cartStore';

    const route = useRoute();
    const router = useRouter();
    const isClicked = ref(false);
    const isBasketModalOpen = ref(false);
    const currentUrl = route.name;
    const store = cartStore();
</script>

<template>
    <div>
        <nav class="w-5/6 m-auto h-15 flex justify-between lg:grid grid-cols-3 items-center absolute left-0 right-0 top-8 lg:top-15">
            <!-- logo -->
            <div class="text-white font-semibold text-3xl font-kulim-park">
                <RouterLink to="/">
                    Modulara
                </RouterLink>
            </div>

            <!-- navbar -->
            <ul class="hidden lg:flex items-center gap-8 text-white m-auto font-dm-sans pt-3">
                <li 
                    v-for="(menu, index) in navbarMenu"
                    :key="index"
                    class="text-lg"
                >
                    <RouterLink :to="menu.path">
                        {{menu.name}}
                    </RouterLink>
                </li>
            </ul>


            <div class="flex items-center justify-end gap-4">
                <!-- icon menu -->
                <ul class="flex items-center gap-3 text-white justify-end">
                    <li 
                        v-for="(menu, index) in iconMenu"
                        :key="index"
                    >
                        <button 
                            class="cursor-pointer relative"
                            @click="handleIconClick(menu.path, menu.name, () => isBasketModalOpen = true, router)"
                        >
                            <div 
                            v-if="menu.name=='Cart'"
                            class="absolute bg-red-500 text-white font-medium text-[10px] h-4 w-4 flex-center p-0 rounded-full -right-2 -top-2"
                            >
                                {{ store.cartTotal }}
                            </div>
                            <i :class="['text-xl',menu.icon]"></i>
                        </button>
                    </li>
                </ul>

                <!-- hamburger menu -->
                <button @click="isClicked=true" class="block lg:hidden text-end text-white">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button> 
            </div>
            
        </nav>

        <!-- mobile menu -->
        <MobileMenu 
            :open="isClicked" 
            :close="()=>isClicked=false"
            :currentUrl="currentUrl"
        />

        <!-- cart -->
        <Cart 
            :open="isBasketModalOpen"
            :close="()=>isBasketModalOpen=false"
        />
    </div>
</template>