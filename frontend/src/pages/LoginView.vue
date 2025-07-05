<script setup>
    import bg from '../assets/images/login-bg.png'
    import logo from '../assets/images/white-logo.png'
    import google from '../assets/images/google.png'
    import email from '../assets/images/email.png'
    import password from '../assets/images/password.png'
</script>

<template>
    <div id="login">
        <!-- bg -->
        <div class="w-full h-full overflow-hidden">
            <!-- bg image -->
            <img :src="bg" alt="" class="object-center">

            <!-- logo -->
             <img :src="logo" alt="" class="absolute top-15 left-15">
        </div>

        <!-- login form -->
        <div class="flex-center p-30">
            <div class="">
                <h1 class="text-2xl font-semibold text-[var(--color-gray)]">Log in to your Account</h1>
                <p class="font-light col-center-left text-[var(--color-gray)]">Sign in to access your orders, saved sofas, and personalized recommendations.</p>

                <!-- sign in with google -->
                <button class="flex-center gap-3 border w-full border-[#D9D9D9] p-3 mt-3 rounded-lg h-[57px]">
                    <img :src="google" alt="">
                    <span class="font-semibold text-[var(--color-gray)] cursor-pointer">Sign in with Google</span>
                </button>

                <!-- continue with email -->
                <div class="flex-center gap-2 mt-4">
                    <hr class="border border-gray-100 w-full">
                    <span class="w-full text-sm text-gray-400">or continue with email</span>
                    <hr class="border border-gray-100 w-full">
                </div>

                <!-- email -->
                <div class="border border-[#D9D9D9] rounded-lg h-[57px] mt-4 grid grid-cols-[50px_1fr]">
                    <div class="w-full h-full flex-center">
                       <img :src="email" alt="" class="h-[20px]"> 
                    </div>
                    <input type="text" class="w-full h-full border-none focus:outline-none" placeholder="Email">
                </div>

                <!-- password -->
                <div class="border border-[#D9D9D9] rounded-lg h-[57px] mt-4 grid grid-cols-[50px_1fr]">
                    <div class="w-full h-full flex-center">
                       <img :src="password" alt="" class="h-[20px]"> 
                    </div>
                    <input type="password" class="w-full h-full border-none focus:outline-none bg-transparent" placeholder="Password">
                </div>

                <!-- forgot password -->
                <div class="mt-3 text-end">
                    <button class="font-semibold text-[var(--color-gray)] cursor-pointer">Forgot password?</button>
                </div>

                <!-- login -->
                <button class="w-full text-center h-[57px] bg-[var(--color-gray)] mt-7 rounded-lg text-white">Login</button>

                <!-- create an account -->
                <p class="text-center mt-5 text-[#A29F9F] cursor-pointer">Don't have an account? <span class="text-[var(--color-gray)] font-semibold">Create an account</span></p>
                
            </div>
            
        </div>
    </div>
</template>