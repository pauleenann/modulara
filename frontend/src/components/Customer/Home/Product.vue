<script setup>
    import sample from '../../../assets/images/sample-sofa.png'
</script>

<template>
    <div class="flex flex-col">
        <div class="w-full h-120 bg-[#f5f5f5] flex items-center justify-center rounded-2xl">
            <img :src="sample" alt="" class=" object-contain">
        </div>

        <!-- name and price -->
        <div class="flex justify-between mt-4 font-medium font-dm-sans text-xl">
            <p>Sofa name</p>
            <p>₱28,900</p>
        </div>

        <!-- category -->
        <p class="text-xl">3-Seater Modular</p>

        <!-- add to basket and favorite -->
        <div class="mt-3 flex items-center gap-3">
            <!-- basket -->
            <button class="bg-[var(--color-gray)] w-10 h-10 rounded-4xl text-white">
                <i class="fa-solid fa-basket-shopping"></i>
            </button>
            <!-- favorite -->
            <button class="">
                <i class="fa-regular fa-heart text-4xl text-[var(--color-gray)]" ></i>
            </button>
        </div>
    </div>
</template>