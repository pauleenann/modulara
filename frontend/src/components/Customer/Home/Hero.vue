<script setup>
    import Navbar from './Navbar.vue';
    import { features } from '@/constants/constants';
    import { gsap } from "gsap";
    import { onMounted } from 'vue';
    import { SplitText } from 'gsap/all';
    import { test } from '@/services/auth';
    
    onMounted(()=>{
        const subSplits = gsap.utils.toArray(".subtitle").map(el =>
            new SplitText(el, { type: "lines" })
        )

        gsap.from("#hero-title",{
            y: 200,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out",
        })

        gsap.from("#hero-btn",{
            y: 200,
            opacity: 0,
            delay: 0.2,
            duration: 1.8,
            ease: "expo.out",
        })

        gsap.from(".title", {
            y: 100,
            opacity: 0,
            delay: 0.2,
            ease: "expo.out",
            duration: 1.8,
            stagger: 0.03,
            scrollTrigger: {
                trigger: '#feature',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        subSplits.forEach(split => {
            gsap.from(split.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06,
                delay: 1,
                scrollTrigger: {
                    trigger: '#feature',
                    start: 'top bottom',
                    end: 'bottom bottom',
                }
            })
        })
        
    })

</script>

<template>
    <section class="h-screen lg:h-[1200px] w-screen bg-[url('/images/home-bg.png')] bg-cover bg-[40%] lg:bg-center relative">
        <!-- overlay -->
        <div class="absolute h-100 left-0 right-0 bottom-0 bg-gradient-to-t from-white/70 to-transparent"></div>

        <!-- navbar -->
        <Navbar/>
        

        <!-- quote and cta -->
        <div class="absolute top-65 lg:top-60 inset-0 text-center">
            <!-- header -->
            <h1 id="hero-title" class=" text-white text-5xl lg:text-[105px] text-center font-thin mb-5 lg:text-sm/26 font-didact">Redefine Comfort,<br/>One Module at a Time.</h1>

            <!-- button -->
            <button 
            id="hero-btn" 
            class="border border-white text-white p-4 rounded-xl mb-8 hover:-translate-y-1 cursor-pointer font-dm-sans"
            @click="test"
            >
                Shop the Collection
            </button>
        </div>

        <!-- features -->
        <div id="feature" class="hidden absolute bottom-0 left-0 right-0 w-5/6 m-auto lg:grid lg:grid-cols-3 py-10 gap-8">
            <div v-for="(feature, index) in features" :key="index" class="w-full h-full">
                <p  class="title text-xl lg:text-2xl text-[var(--color-gray)] font-semibold">{{ feature.title }}</p>
                <p  class="subtitle text-md lg:text-xl text-[var(--color-gray)]">{{ feature.description }}</p>
            </div>
        </div>
    </section>
</template>