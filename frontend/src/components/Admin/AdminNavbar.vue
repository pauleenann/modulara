<script setup>
    import { adminNavMenu } from '@/constants/constants';
    import { authStore } from '@/store/authStore';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        title: String
    })
    const isOpen = ref(false)
    const auth = authStore()
    const router = useRouter()

    const handleClick = (menu)=>{
        switch(menu){
            case 'Logout':
                auth.logout(router)
                break
            default:
                console.log('Menu not recognized. Please try again.')
        }
    }
</script>

<template>
    <nav class="bg-white shadow w-full h-13 flex items-center justify-between p-5 relative">
        <h3 class="font-kulim-park text=[var(--color-gray)] font-bold text-xl">Modulara {{ props.title }}</h3>

        <!-- user icon -->
        <button @click="isOpen=!isOpen">
            <i class="fa-solid fa-circle-user text-2xl cursor-pointer"></i>
        </button>

        <!-- expand user -->
        <div 
            v-if="isOpen"
            class="absolute bg-white right-5 top-11 shadow rounded-xl w-40 overflow-hidden"
        >
            <ul>
                <li 
                    v-for="(menu, index) in adminNavMenu" 
                    :key="index"
                >
                    <button 
                    class=" w-full py-2 px-5  hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-[var(--color-gray)]"
                    @click="handleClick(menu.name)"
                    >
                        <i :class="menu.icon"></i>
                        {{ menu.name }}
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>