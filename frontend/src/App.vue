<script setup>
    import { gsap } from "gsap";
    import { ScrollTrigger, SplitText } from 'gsap/all';

    //register scrolltrigger
    gsap.registerPlugin(ScrollTrigger, SplitText) 
</script>
  
<template>
  <main>
    <RouterView />
  </main>
</template>
