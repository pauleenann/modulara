<script setup>
    import { Carousel, Navigation, Slide } from 'vue3-carousel';

    const props = defineProps({
        product: Object
    })

    const config = {
        mouseWheel: true,
        breakpointMode: 'carousel',
        breakpoints: {
            100: {
                height: 300,
            },
            500: {
                height: 600,
            },
            
        },
    }

    console.log(props.product)
    
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 mt-13 pb-20 border-b border-gray-200">
        <!-- carousel -->
            <div>
                <Carousel v-bind="config">
                    <Slide 
                    v-for="(image, index) in props.product.existingImages" 
                    :key="index"
                    class="bg-[#F5F5F5] rounded-xl">
                        <img 
                        :src="image.preview" 
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

            <div class="mt-5 lg:m-0 lg:ps-15">
                <!-- heart/favorite -->
                <div class="flex justify-end">
                    <i class="fa-solid fa-heart text-3xl text-gray-300"></i>
                </div>

                <!-- product info -->
                <div class="mt-10 lg:mt-15">
                    <p class="text-lg lg:text-xl text-[#A29F9F]">{{ props.product.category }}</p>
                    <h3 class="text-2xl lg:text-3xl text-[var(--color-gray)] font-medium">{{ props.product.name }}</h3>
                    <p class="text-lg lg:text-xl text-[var(--color-gray)]">{{ props.product.description }}</p>

                    <!-- ratings -->
                    <div class="flex items-center gap-1 text-[#444444] mt-2">
                        <!-- <span class="text-lg font-semibold">{{ product.ratings }}</span>
                        <i class="fa-solid fa-star"></i> -->
                    </div>

                    <!-- price -->
                    <p class="font-medium text-[var(--color-gray)] text-2xl lg:text-3xl mt-6">₱{{ props.product.price&&props.product.price.toLocaleString() }}</p>

                    <!-- colors and quantity -->
                    <div class="grid grid-cols-[100px_1fr] items-center mt-10 gap-y-7">
                        <!-- colors -->
                        <p>Colors</p>
                        <div class="flex gap-2">
                            <span 
                            v-for="(variant, index) in props.product.variants" 
                            :key="index"
                            class="h-10 w-10 bg-red-400 rounded-full"
                            :style="{ backgroundColor: variant.color }"
                            :title="variant.name"
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
                    <div class="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-3">
                        <!-- add to cart -->
                        <button class="bg-[var(--color-gray)] text-white p-3 rounded-3xl flex-center gap-3 font-semibold hover:bg-[#1f1f1f] cursor-pointer transition duration-200 ease-in-out">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add to cart
                        </button>

                        <!-- buy now -->
                        <button class="border-2 border-[var(--color-gray)] text-[var(--color-gray)] p-3 rounded-3xl flex-center gap-3 font-semibold hover:bg-[#1f1f1f] hover:text-white cursor-pointer transition duration-200 ease-in-out">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>