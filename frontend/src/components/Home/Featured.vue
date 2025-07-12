<script setup>
    import CategoryPill from './CategoryPill.vue';
    import FeaturedCategory from './FeaturedCategory.vue'
    import { featuredCategories } from '@/constants/constants';
    import gsap from 'gsap';
    import { SplitText } from 'gsap/all';
    import { onMounted } from 'vue';

    onMounted(()=>{
        const subSplit = new SplitText('#subtitle',{
            type: 'lines'
        })

        gsap.from('#pill',{
            y:100,
            opacity:0,
            ease: "expo.out",
            delay: 0.05,
            duration: 1,
            scrollTrigger:{
                trigger: '#pill',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        gsap.from(subSplit.lines,{
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
            stagger: 0.3,
            delay: 0.3,
            scrollTrigger: {
                trigger: '#subtitle',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        gsap.from('#categories',{
            y:100,
            opacity:0,
            ease: "expo.out",
            delay: 1.2,
            duration: 1,
            scrollTrigger:{
                trigger: '#featured',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })


    })

</script>

<template>
    <section id="featured" class="w-5/6 h-auto py-30 lg:py-45 flex flex-col justify-center items-start gap-4 m-auto">
        <!-- category title-->
        <CategoryPill id="pill" category="Featured Categories" />

        <!-- header -->
        <h2 id="subtitle" class="text-4xl lg:text-5xl text-[var(--color-gray)] font-extralight font-dm-sans">Tailored for your lifestyle — shop our <br/>modern, <span class="font-bold">modular sofa collection.</span></h2>

        <!-- categories -->
        <div id="categories" class="grid lg:grid-cols-2 w-full h-auto lg:h-screen mt-4 gap-4">
            <!-- first category (first column) -->
            <FeaturedCategory :category="featuredCategories[0]"/>

            <!-- 2nd and 3rd category -->
            <div class="flex flex-col gap-4">
                <FeaturedCategory :category="featuredCategories[1]"/>
                <FeaturedCategory :category="featuredCategories[2]"/>
            </div>
        </div>
    </section>
</template>