<script setup>
    import { onMounted } from 'vue';
    import CategoryPill from './CategoryPill.vue';
    import Product from './Product.vue';
    import gsap from 'gsap';
    import { SplitText } from 'gsap/all';

    onMounted(()=>{
        const subSplit = new SplitText('#bs-subtitle',{
            type: 'lines'
        })

        gsap.from('#bs-pill',{
            y:100,
            opacity:0,
            ease: "expo.out",
            delay: 0.05,
            duration: 1,
            scrollTrigger:{
                trigger: '#bs-pill',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        gsap.from(subSplit.lines,{
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
            scrollTrigger: {
                trigger: '#bs-subtitle',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        gsap.from('.product', {
            opacity: 0,
            y: 100,
            duration: 1,
            stagger: 0.06,
            ease: 'expo.out',
            delay:  1,
            scrollTrigger: {
                trigger: '.product',
                start: 'top bottom',
            },
        })
       
    })
</script>

<template>
    <section class="w-5/6 h-auto pb-45 flex flex-col justify-center items-end gap-4 m-auto">
        <!-- category title-->
        <CategoryPill id="bs-pill" category="Our Bestsellers" />

        <!-- header -->
        <h2 id="bs-subtitle" class="text-4xl lg:text-5xl text-end text-[var(--color-gray)] font-extralight font-dm-sans">Discover the sofas our customers can’t stop<br/>talking about — <span class="font-bold">comfort, style, and modular<br/>design at their best.</span></h2>

        <!-- bestsellers -->
        <div class="w-full h-auto grid lg:grid-cols-3 gap-x-7 gap-y-10  mt-10">
            <Product v-for="index in 6" :key="index" class="product"/>
        </div>
        
    </section>
</template>