<script setup>
    const props = defineProps({
        product: Object
    })
</script>

<template>
    <div class="flex flex-col">
        <div class="w-full h-80 lg:h-120 bg-[#f5f5f5] flex-center rounded-2xl p-6">
            <img :src="props.product.images[0]" alt="" class=" object-contain">
        </div>

        <!-- name and price -->
        <div class="flex justify-between mt-4 font-medium font-dm-sans text-xl">
            <p>{{ props.product.name }}</p>
            <p>₱{{ props.product.price.toLocaleString() }}</p>
        </div>

        <!-- category -->
        <p class="text-xl">{{ props.product.category }}</p>

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