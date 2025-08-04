<script setup>
import CartItem from './CartItem.vue';

    const props = defineProps({
        open:Boolean,
        close: Function
    })
</script>

<template>
    <div 
    :class="[
        'fixed right-0 z-75 bg-white w-full lg:w-130 h-screen overflow-y-scroll p-8 transition-transform duration-300 ease-in-out shadow-2xl',
        props.open ? 'translate-x-0' : 'translate-x-full'
    ]">
        <!-- exit -->
        <div class="text-end">
            <button 
            @click="props.close"
            class="cursor-pointer">
                <i class="fa-solid fa-xmark text-2xl"></i>
            </button>
        </div>
        
        <!-- your cart -->
        <div class="mt-5 flex flex-col gap-4">
            <h1 class="font-dm-sans text-2xl font-semibold">Your Cart</h1>

            <!-- items -->
            <CartItem 
                v-for="index in 5"
                :key="index"
            />
        </div>

        <!-- order summary -->
        <div class="font-dm-sans text-[var(--color-gray)] mt-8 flex flex-col gap-2">
            <h2 class="text-lg font-bold">Order Summary</h2>
            <div class="grid grid-cols-2 flex flex-col gap-2">
                <!-- product -->
                <p>Products (2)</p>
                <p class="text-end">₱28,900</p>
                <!-- delivery price -->
                <p>Delivery price</p>
                <p class="text-end">₱50</p>
            </div>
            <hr>
            <div class="grid grid-cols-2 flex flex-col gap-2 font-semibold">
                <!-- subtotal -->
                <p class="text-xl">Subtotal</p>
                <p class="text-end text-2xl">₱28,900</p>
            </div>
            <!-- proceed to checkout btn -->
            <button class="text-white bg-[var(--color-gray)] hover:bg-[#1f1f1f] p-4 font-semibold rounded-3xl mt-3 mb-10 cursor-pointer transform duration-300 ease-in-out text-sm">
                Proceed to checkout
            </button>
        </div>
    </div>
</template>