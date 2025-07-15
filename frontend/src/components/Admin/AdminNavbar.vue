<script setup>

    const props = defineProps({
        title: String
    })
</script>

<template>
    <nav class="bg-white shadow w-full h-13 flex items-center justify-between p-5 ">
        <h3 class="font-kulim-park text=[var(--color-gray)] font-bold text-xl">Modulara {{ props.title }}</h3>

        <!-- user icon -->
        <div>
            <img src="" alt="" class="bg-gray-300 h-8 w-8 rounded-full">
        </div>
    </nav>
</template>