<script setup> 
    import { navbarMenu } from '@/constants/constants'
    import { iconMenu } from '@/constants/constants';
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useRoute } from 'vue-router';
    import MobileMenu from '../Home/MobileMenu.vue';
    import Cart from '../Home/Cart.vue';
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
        <nav class="w-5/6 m-auto h-15 flex justify-between items-center absolute left-0 right-0 top-8 lg:top-15">
            <!-- logo and search bar -->
            <div class="text-[var(--color-gray)] font-semibold text-3xl font-kulim-park flex items-center gap-8">
                <!-- logo -->
                <RouterLink to="/">
                    Modulara
                </RouterLink>

                <!-- search bar -->
                <div 
                class="hidden lg:flex bg-[#F3F3F3] h-12 w-120 rounded-4xl items-center px-6 gap-4 ">
                    <i class="fa-solid fa-magnifying-glass text-lg text-[var(--color-gray)]"></i>
                    <input 
                    type="text" 
                    class="h-full w-full text-lg font-normal font-dm-sans text-[var(--color-gray)] placeholder-[var(--color-gray)] focus:outline-0" 
                    placeholder="Looking for a modular fit?">
                </div>
                
            </div>

            <div class="flex items-center gap-4">
                <!-- icon menu -->
                <ul class="flex items-center gap-3 text-[var(--color-gray)] justify-end">
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
                <button @click="isClicked=true" class="block lg:hidden text-end text-[var(--color-gray)]">
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