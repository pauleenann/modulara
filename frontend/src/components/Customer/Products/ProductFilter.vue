<script setup>
    import { filters } from '@/constants/constants';
    import { Carousel, Slide, Navigation } from 'vue3-carousel';

    const config = {
        breakpointMode: 'carousel',
        breakpoints: {
            100: {
                itemsToShow: 1,
            },
            500:{
                itemsToShow: 2,
            },
            768: {
                itemsToShow: 4,
            },
            900:{
                itemsToShow:6
            }
        },
    };
</script>

<template>
  <div class="w-full">
    <Carousel 
    v-bind="config"
      class="px-10 flex items-center"
    >
      <Slide
        v-for="(filter, index) in filters"
        :key="index"
      >
        <button 
            :class="[
            'border border-[#D9D9D9] text-[var(--color-gray)] rounded py-2 px-4 transition duration-300 ease-in-out hover:bg-[#D9D9D9] cursor-pointer font-dm-sans w-full',
            index !== filters.length - 1 ? 'mr-4' : '']">
            {{ filter }}
        </button>
      </Slide>

      <!-- Navigation Buttons -->
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
</template>
