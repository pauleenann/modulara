<script setup>
</script>

<template>
    <div class="w-60 h-90 p-8 text-lg text-[var(--color-gray)] font-dm-sans border border-gray-200 rounded-xl flex flex-col justify-between">
        <p>“The mustard color is stunning in person — bold but classy. Super comfy too. It became the statement piece of our living room!”</p>

        <div>
            <!-- stars -->
            <div class="flex items-center gap-1">
                <i 
                v-for="star in 5"
                :key="star"
                class="fa-solid fa-star"></i>
            </div>

            <!-- username -->
            <p class="font-semibold">Anna M.</p>
        </div>
    </div>
</template>