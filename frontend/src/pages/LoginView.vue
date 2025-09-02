<script setup>
    import logo from '../assets/images/white-logo.png'
    import google from '../assets/images/google.png'
    import email from '../assets/images/email.png'
    import password from '../assets/images/password.png'
    import { authStore } from '@/store/authStore'
    import { RouterLink, useRouter } from 'vue-router'
    import { test } from '@/services/auth'
    import { computed, reactive } from 'vue'
    
    const router = useRouter();
    const auth = authStore();
    const user = reactive({
        email: '',
        password: ''
    })
    const isDisabled = computed(()=> !user.email || !user.password)

</script>

<template>
    <div id="login">
        <!-- bg -->
        <div  
            class="hidden md:block bg-[url('images/login-bg.png')] w-full h-full relative bg-center"
        >
            <!-- logo -->
            <RouterLink to="/">
               <img :src="logo" alt="" class="absolute top-15 left-15"> 
            </RouterLink>
            
    </div>

        <!-- login form -->
        <div
            class="flex-center p-5 md:p-30 relative bg-[url('images/login-bg.png')] md:bg-none bg-cover bg-center"
        >
            <!-- form -->
            <div class="z-50 bg-white/60 backdrop-blur-3xl p-8 md:p-0 rounded-3xl ">
                <!-- logo -->
                <h1 class="block md:hidden font-kulim-park text-3xl font-bold mb-5">Modulara</h1>

                <h2 class="md:text-2xl font-semibold text-[var(--color-gray)]">Log in to your Account</h2>
                <p class="text-sm md:text-lg font-light col-center-left text-[var(--color-gray)]">Sign in to access your orders, saved sofas, and personalized recommendations.</p>
                
                <!-- error -->
                <div
                v-if="auth.error" 
                class="border border-red-500 bg-red-100 p-3 font-medium text-sm text-center rounded my-5">
                    {{ auth.error }}
                </div>

                <!-- sign in with google -->
                <button 
                    class="flex-center gap-3 border w-full border-[#D9D9D9] p-2 md:p-3 mt-3 rounded-lg md:h-[52px] hover:bg-[#D9D9D9] transition delay-100 duration-300 ease-in-out cursor-pointer"
                    @click="auth.signinGoogle(router)"
                >
                    <img :src="google" alt="" class="w-[20px] md:w-auto">
                    <span class="text-sm md:text-lg font-semibold text-[var(--color-gray)] cursor-pointer">Sign in with Google</span>
                </button>

                <!-- continue with email -->
                <div class="flex-center gap-2 mt-4">
                    <hr class="border border-[#D9D9D9] md:border-gray-100 w-full">
                    <span class="w-full text-xs md:text-sm text-center text-gray-400">or continue with email</span>
                    <hr class="border border-[#D9D9D9] md:border-gray-100  w-full">
                </div>

                <!-- email -->
                <div class="border border-[#D9D9D9] rounded-lg md:h-[52px] mt-4 grid grid-cols-[50px_1fr] p-2">
                    <div class="w-full h-full flex-center">
                       <img 
                       :src="email" 
                       alt="" class="h-[20px]"> 
                    </div>
                    <input 
                    type="text" 
                    class="text-sm md:text-lg w-full h-full border-none focus:outline-none pr-4" 
                    placeholder="Email"
                    v-model="user.email">
                </div>

                <!-- password -->
                <div class="border border-[#D9D9D9] rounded-lg md:h-[52px] mt-4 grid grid-cols-[50px_1fr] p-2">
                    <div class="w-full h-full flex-center">
                       <img 
                       :src="password" 
                       alt="" 
                       class="h-[20px]"> 
                    </div>
                    <input 
                    type="password" 
                    class="text-sm md:text-lg w-full h-full border-none focus:outline-none pr-4" 
                    placeholder="Password"
                    v-model="user.password">
                </div>

                <!-- forgot password -->
                <div class="mt-3 text-end">
                    <button class="text-xs md:text-sm font-semibold text-[var(--color-gray)] cursor-pointer">Forgot password?</button>
                </div>

                

                <!-- login -->
                <button 
                :class="[
                    'w-full text-center md:h-[52px] p-2 bg-[var(--color-gray)] mt-5 md:mt-7 rounded-lg text-white hover:bg-[#202020] transition delay-100 duration-300 ease-in-out cursor-pointer',
                    isDisabled
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-[var(--color-gray)] hover:bg-[#202020] cursor-pointer'
                ]"
                @click="auth.login(router, user)"
                :disabled="isDisabled"
                >
                    Login
                </button>

                <!-- create an account -->
                <p class="text-xs md:text-sm text-center mt-3 md:mt-5 text-[#A29F9F] cursor-pointer">
                    Don't have an account? 
                    <RouterLink 
                    class="text-[var(--color-gray)] font-semibold"
                    to="/signup">
                        Create an account
                    </RouterLink>
                </p>
                
            </div>
            
        </div>
    </div>
</template>