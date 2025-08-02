<script setup>
    import { Carousel, Navigation, Slide } from 'vue3-carousel';
    import { sampleProduct } from '@/constants/constants';
    
</script>

<template>
    <div class="grid grid-cols-2 mt-20 pb-20 border-b border-gray-200">
        <!-- carousel -->
            <div>
                <Carousel
                :height="600"
                :mouse-wheel="true">
                    <Slide 
                    v-for="(image, index) in sampleProduct.images" 
                    :key="index"
                    class="bg-[#F5F5F5] rounded-xl">
                        <img 
                        :src="image" 
                        alt=""
                        class="w-150">
                    </Slide>

                    <!-- navigation -->
                    <template #addons>
                        <Navigation>
                            <template #prev>
                                <span>
                                    <i class="fa-solid fa-chevron-left text-lg"></i>
                                </span>
                            </template>
                            <template #next>
                                <span>
                                    <i class="fa-solid fa-chevron-right text-lg"></i>
                                </span>
                            </template>
                        </Navigation>
                    </template>
                </Carousel>
            </div>

            <div class="ps-15">
                <!-- heart/favorite -->
                <div class="flex justify-end">
                    <i class="fa-solid fa-heart text-3xl text-gray-300"></i>
                </div>

                <!-- product info -->
                <div class="mt-15">
                    <p class="text-xl text-[#A29F9F]">{{ sampleProduct.category }}</p>
                    <h3 class="text-3xl text-[var(--color-gray)] font-medium">{{ sampleProduct.name }}</h3>
                    <p class="text-xl text-[var(--color-gray)]">{{ sampleProduct.description }}</p>

                    <!-- ratings -->
                    <div class="flex items-center gap-1 text-[#444444] mt-2">
                        <span class="text-lg font-semibold">{{ sampleProduct.ratings }}</span>
                        <i class="fa-solid fa-star"></i>
                    </div>

                    <!-- price -->
                    <p class="font-medium text-[var(--color-gray)] text-3xl mt-6">₱{{ sampleProduct.price.toLocaleString() }}</p>

                    <!-- colors and quantity -->
                    <div class="grid grid-cols-[100px_1fr] items-center mt-10 gap-y-7">
                        <!-- colors -->
                        <p>Colors</p>
                        <div class="flex gap-2">
                            <span 
                            v-for="(variant, index) in sampleProduct.attributes.variants" 
                            :key="index"
                            class="h-10 w-10 bg-red-400 rounded-full"
                            :style="{ backgroundColor: variant.color }"
                            ></span>
                        </div>

                        <!-- quantity -->
                        <p>Quantity</p>
                        <div class="flex items-center gap-4">
                            <button class="h-8 w-8 flex-center border border-gray-200 rounded-full">
                                <i class="fa-solid fa-minus text-xs"></i>
                            </button>
                            <span class="font-semibold">0</span>
                            <button class="h-8 w-8 flex-center border border-gray-200 rounded-full">
                                <i class="fa-solid fa-plus text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- add to cart and buy now -->
                    <div class="grid grid-cols-2 mt-12 gap-3">
                        <!-- add to cart -->
                        <button class="bg-[var(--color-gray)] text-white p-3 rounded-3xl flex-center gap-3 font-semibold">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add to cart
                        </button>

                        <!-- buy now -->
                        <button class="border-2 border-[var(--color-gray)] text-[var(--color-gray)] p-3 rounded-3xl flex-center gap-3 font-semibold">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>