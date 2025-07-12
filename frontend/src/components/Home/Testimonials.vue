<script setup>
    import { onMounted } from 'vue';
    import CategoryPill from './CategoryPill.vue';
    import Testimonial from './Testimonial.vue';
    import gsap from 'gsap';
    import 'vue3-carousel/carousel.css';
    import { Carousel, Slide } from 'vue3-carousel';

    const config = {
        wrapAround: true,
        autoplay: 3000,
        pauseAutoplayOnHover: true,
        breakpointMode: 'carousel',
        breakpoints: {
            100: {
                itemsToShow: 1,
            },
            768: {
                itemsToShow: 2,
            }
        },
    };

    onMounted(() => {
        gsap.from('#t-pill', {
            y: 100,
            opacity: 0,
            ease: "expo.out",
            delay: 0.05,
            duration: 1,
            scrollTrigger: {
            trigger: '#t-pill', 
            start: 'top bottom',
            end: 'bottom bottom',
            },
        });

        gsap.from('#t-head', {
            y: 100,
            opacity: 0,
            ease: "expo.out",
            delay: 0.3,
            duration: 1,
            scrollTrigger: {
            trigger: '#t-head',
            start: 'top bottom',
            end: 'bottom bottom',
            },
        });

        gsap.from('#carousel', {
            y: 100,
            opacity: 0,
            ease: "expo.out",
            delay: 1,
            duration: 1,
            scrollTrigger: {
            trigger: '#carousel',
            start: 'top bottom',
            end: 'bottom bottom',
            },
        });
    });
</script>

<template>
    <section class="w-full h-auto col-center py-40 lg:py-45 gap-3">
      <!-- header -->
      <CategoryPill id="t-pill" category="Testimonials" />
      <h2
        id="t-head"
        class="font-dm-sans font-light text-5xl lg:text-7xl text-[var(--color-gray)] text-center"
      >
        What They Say About Us
      </h2>
  
      <div id="carousel" class="mt-5 lg:mt-10 w-full">
        <Carousel v-bind="config">
          <Slide v-for="index in 5" :key="index">
            <Testimonial />
          </Slide>
        </Carousel>
      </div>
    </section>
 </template>
  