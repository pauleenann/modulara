<script setup>
    const props = defineProps({
        open: Boolean,
        close: Function
    })
</script>

<template>
    <div v-if="open" class="bg-gray-500/30 absolute inset-0 flex-center">
        <!-- modal -->
        <div class="bg-white w-150 h-150 rounded-2xl px-5 py-7 overflow-hidden ">
            <!-- header -->
            <header class="flex justify-between items-center">
                <h2 class="font-kulim-park font-bold text-2xl text-[var(--color-gray)]">Add Modulara Product</h2>

                <!-- close button -->
                <button  
                    class="h-8 w-8 flex-center hover:bg-gray-300 rounded-full text-[var(--color-gray)] hover:text-white transition delay-50 duration-300 ease-in-out cursor-pointer"
                    @click="props.close"
                >
                    <i class="text-2xl fa-solid fa-xmark"></i>
                </button>
            </header>

            <!-- form content -->
            <div class="overflow-y-auto px-2 font-dm-sans">
                <form action="" class="mt-5 flex flex-col gap-4">
                    <!-- product name -->
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm/6 font-medium text-gray-900">Product name</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)]">
                                <input type="text" name="username" id="username" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Modular Sofa" />
                            </div>
                        </div>
                    </div>

                    <!-- product description -->
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm/6 font-medium text-gray-900">Description</label>
                        <div class="mt-2">
                            <textarea name="about" id="about" rows="3" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Enter product description"/>
                            </div>
                            <p class="mt-3 text-sm/6 text-gray-600">Write a few sentences about this product.</p>
                    </div>

                    <!-- category -->
                    <div class="sm:col-span-3">
                        <label for="country" class="block text-sm/6 font-medium text-gray-900">Category</label>
                        <div class="mt-2 grid grid-cols-1">
                        <select id="country" name="country" autocomplete="country-name" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            <option disabled selected >Enter product category</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                        </div>
                    </div>

                    <!-- price -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Price</label>
                        <div class="mt-2">
                        <input type="number" min="0" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Enter product price"/>
                        </div>
                    </div>

                    <!-- total quantity -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                        <div class="mt-2">
                        <input type="number" min="0" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"  placeholder="Enter product quantity"/>
                        </div>
                    </div>
                </form>
            </div>
            

        
        </div>
    </div>
</template>