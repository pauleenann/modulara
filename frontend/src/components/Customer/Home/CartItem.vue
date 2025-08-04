<script setup>

</script>

<template>
    <div class="relative w-full min-h-25 border border-gray-200 rounded flex justify-between p-4">
        <!-- remove -->
        <i class="fa-solid fa-circle-xmark text-xl absolute -right-2 -top-2 text-[var(--color-gray)] hover:text-[#1f1f1f] cursor-pointer transform duration-300 ease-in-out"></i>
    
        <div class="flex item-center gap-3">
            <!-- image -->
            <div class="flex-center bg-[#F5F5F5] w-25 h-25 rounded p-2">
                <img 
                    src="/images/sample-sofa.png" 
                    alt="Sofa"
                    class=""
                >
            </div>

            <!-- item info -->
            <div class="font-dm-sans leading-5 font-medium flex flex-col justify-between">
                <div>
                    <p class="font-black">Solis 3-Seater</p>
                    <p class="text-[var(--color-gray)]">3-Seater Modular</p>
                    <i class="text-[#A29F9F]">Color: Mustard</i> 
                </div>
                
                <div class="flex items-center gap-3">
                    <button class="h-6 w-6 flex-center border border-gray-200 rounded-full">
                        <i class="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span class="font-semibold">0</span>
                    <button class="h-6 w-6 flex-center border border-gray-200 rounded-full">
                        <i class="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
        </div>

        <p class="font-medium">₱28,900</p>
    </div>
</template>