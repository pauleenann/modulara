<script setup>
    import { SplitText } from 'gsap/all';
    import CategoryPill from './CategoryPill.vue';
    import gsap from 'gsap';
    import { onMounted } from 'vue';

    onMounted(()=>{
        const subSplit = new SplitText('#abt-subtitle',{
            type: 'lines'
        })

        gsap.from('#abt-pill',{
            y:100,
            opacity:0,
            ease: "expo.out",
            delay: 0.05,
            duration: 1,
            scrollTrigger:{
                trigger: '#abt-pill',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        gsap.from('#abt-h',{
            y:100,
            opacity:0,
            ease: "expo.out",
            delay: 0.5,
            duration: 1,
            scrollTrigger:{
                trigger: '#abt-pill',
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
                trigger: '#abt-subtitle',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })

        gsap.from("#abt-img",{
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
            delay: 1.1,
            scrollTrigger: {
                trigger: '#abt-subtitle',
                start: 'top bottom',
                end: 'bottom bottom',
            }
        })
    })

</script>

<template>
    <section class="w-full h-auto flex flex-col gap-8 overflow-y-hidden">
        <!-- about content -->
        <div class="w-5/6 m-auto flex flex-col items-start gap-2">
            <CategoryPill id="abt-pill" category="About Modulara" />
            <h2 id="abt-h"  class="font-dm-sans font-light text-6xl lg:text-7xl text-[var(--color-gray)]">Modulara</h2>
            <p id="abt-subtitle" class="font-dm-sans font-light text-xl lg:text-2xl lg:w-[70%]">At Modulara, we design premium modular sofas that evolve with your lifestyle. <br/>Blending modern aesthetics with everyday comfort, our pieces are built to last,<br/>easy to customize, and crafted to fit seamlessly into any space. Whether you're<br/>furnishing a new home or refreshing your style, Modulara makes it effortless<br/>to shape your space—beautifully.</p>
        </div>

        <!-- about image -->
        <div id="abt-img" class="w-full h-100 lg:h-[700px] bg-red-100 bg-[url('/images/about.png')] bg-cover bg-bottom">

        </div>
    </section>
</template>