<script setup>
    import logo from '../assets/images/white-logo.png'
    import google from '../assets/images/google.png'
    import email from '../assets/images/email.png'
    import password from '../assets/images/password.png'
    import { authStore } from '@/store/authStore'
    import { RouterLink, useRouter } from 'vue-router'
    import { computed, reactive, ref, watch } from 'vue'
    import zxcvbn from 'zxcvbn';
    import validator from 'validator';
    import { passwordLevels } from '@/constants/constants'

    const router = useRouter();
    const auth = authStore();
    const user = reactive({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
    const passwordMeter = reactive({
        strength: 0,
        status: '',
        description: ''
    })
    const emailStatus = reactive({
        status: false,
        description:''
    });
    const isDisabled = computed(() => !emailStatus.status || passwordMeter.strength < 2 || !user.firstName || !user.lastName);

    // runs everytime password changes
    watch(()=>user.password, (password)=>{
        const result = zxcvbn(password);
        passwordMeter.strength = result.score;
        passwordMeter.status = passwordLevels[result.score]?.status || '';
        passwordMeter.description = passwordLevels[result.score]?.description || '';
    })

    // runs everytime email changes
    watch(()=>user.email, (email)=>{
        const isValid = validator.isEmail(email);
        emailStatus.status = isValid;
        emailStatus.description = !isValid ? 'Please enter a valid email address.' : '';
    })
</script>

<template>
    <div id="signup">
        <!-- bg -->
        <div 
            to="/"  
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

                <h2 class="md:text-2xl font-semibold text-[var(--color-gray)]">Create an account</h2>
                <p class="text-sm md:text-lg font-light col-center-left text-[var(--color-gray)]">Create an account to save sofas, view orders, and discover tailored picks.</p>

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
                    <span class="text-sm md:text-lg font-semibold text-[var(--color-gray)] cursor-pointer">Continue with Google</span>
                </button>

                <!-- continue with email -->
                <div class="flex-center gap-2 mt-4">
                    <hr class="border border-[#D9D9D9] md:border-gray-100 w-full">
                    <span class="w-full text-xs md:text-sm text-center text-gray-400">or continue with email</span>
                    <hr class="border border-[#D9D9D9] md:border-gray-100  w-full">
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <!-- firstname -->
                    <div class="border border-[#D9D9D9] rounded-lg md:h-[52px] mt-4 grid grid-cols-[50px_1fr] p-2">
                        <div class="w-full h-full flex-center">
                            <i class="fa-solid fa-user text-gray-300"></i>
                        </div>
                        <input 
                        type="text" 
                        class="text-sm md:text-lg w-full h-full border-none focus:outline-none pr-4" 
                        placeholder="First name"
                        v-model="user.firstName">
                    </div>
                    <!-- lastname -->
                    <div class="border border-[#D9D9D9] rounded-lg md:h-[52px] mt-4 grid grid-cols-[50px_1fr] p-2">
                        <div class="w-full h-full flex-center">
                            <i class="fa-solid fa-user text-gray-300"></i>
                        </div>
                        <input 
                        type="text" 
                        class="text-sm md:text-lg w-full h-full border-none focus:outline-none pr-4" 
                        placeholder="Last name"
                        v-model="user.lastName">
                    </div>
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

                <!-- password meter -->
                <div class="grid grid-cols-4 gap-1 mt-2">
                    <div 
                    v-for="index in passwordMeter.strength" 
                    :key="index"
                    :class="[
                        'h-1 rounded-full',
                        passwordMeter.strength === 1 && 'bg-red-500',
                        passwordMeter.strength === 2 && 'bg-yellow-500',
                        passwordMeter.strength === 3 && 'bg-green-500',
                        passwordMeter.strength === 4 && 'bg-green-600',
                    ]">
                    </div>
                </div>

                <!-- password status -->
                <p 
                :class="[
                    'font-dm-sans font-medium text-sm mt-1',
                    passwordMeter.strength === 1 && 'text-red-500',
                    passwordMeter.strength === 2 && 'text-yellow-500',
                    passwordMeter.strength === 3 && 'text-green-500',
                    passwordMeter.strength === 4 && 'text-green-600',
                ]">
                    {{ passwordMeter.status }}
                </p>
                <p class="font-dm-sans text-sm font-medium">{{ passwordMeter.description }}</p>

                <!-- sign up -->
                <button
                :class="[
                    'w-full text-center md:h-[52px] p-2 mt-5 rounded-lg text-white transition delay-100 duration-300 ease-in-out',
                    isDisabled
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-[var(--color-gray)] hover:bg-[#202020] cursor-pointer'
                ]"
                :disabled="isDisabled"
                @click="() => auth.signUp(router, user)"
                >
                    Sign up
                </button>


                <!-- create an account -->
                <p class="text-xs md:text-sm text-center mt-3 md:mt-5 text-[#A29F9F] cursor-pointer">
                    Already have an account? 
                    <RouterLink 
                    class="text-[var(--color-gray)] font-semibold"
                    to="/login">
                        Log in
                    </RouterLink>
                </p>
                
            </div>
            
        </div>
    </div>
</template>