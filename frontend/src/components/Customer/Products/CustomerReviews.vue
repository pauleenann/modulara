<script setup>
    import { Carousel, Slide, Navigation } from 'vue3-carousel';
    import Review from './Review.vue';

    const config = {
        mouseWheel: true,
        breakpointMode: 'carousel',
        breakpoints: {
            100: {
                itemsToShow: 1,
            },
            700: {
                itemsToShow: 3,
            },
            900: {
                itemsToShow: 5,
            }
        },
    };
</script>

<template>
    <div class="w-full py-20">
        <h2 class="text-3xl lg:text-4xl font-dm-sans">Customer Reviews</h2>

        <!-- reviews -->
        <div class="mt-5">
            <Carousel 
            v-bind="config"
            class="px-10">
                <Slide
                v-for="review in 10"
                :key="review">
                    <Review/>
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
    </div>
</template>