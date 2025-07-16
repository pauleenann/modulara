<script setup>
    import { ref } from 'vue';
    import { sofaCategories } from '@/constants/constants';
    import { measurementLabels } from '@/constants/constants';

    const props = defineProps({
        open: Boolean,
        close: Function
    })
    const totalVariants = ref([
        {
            color: '',
            quantity: 0
        }
    ]);

    // remove variant
    const removeVariant = (index)=>{
        console.log(index)
        const updatedVariant = totalVariants.value.filter((item, key) => key !== index)
        totalVariants.value = updatedVariant;
    }

    const addProduct = () => {

    }
</script>

<template>
    <div v-if="open" class="bg-gray-500/30 absolute inset-0 flex-center">
        <!-- modal -->
        <div class="bg-white w-180 h-150 rounded-2xl px-5 py-7 overflow-hidden">
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
            <div class="overflow-y-scroll pb-10 px-2 font-dm-sans w-full h-full">
                <form @submit.prevent="addProduct"  class="mt-5 flex flex-col gap-4 font-dm-sans">
                    <!-- product name -->
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm/6 font-medium text-gray-900">Product name</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)]">
                                <input type="text" name="username" id="username" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="e.g. Modular Sofa" />
                            </div>
                        </div>
                    </div>

                    <!-- product description -->
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm/6 font-medium text-gray-900">Description</label>
                        <div class="mt-2">
                            <textarea name="about" id="about" rows="3" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6" placeholder="e.g. A modern, space-saving 3-seater sofa with durable upholstery and customizable modules."/>
                        </div>
                        <p class="mt-3 text-sm/6 text-gray-600">Write a few sentences about this product.</p>
                    </div>

                    <!-- category -->
                    <div class="sm:col-span-3">
                        <label for="country" class="block text-sm/6 font-medium text-gray-900">Category</label>
                        <div class="mt-2 grid grid-cols-1">
                        <select id="country" name="country" autocomplete="country-name" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6">
                            <option v-for="(sofa,index) in sofaCategories" :key="index">{{sofa}}</option>
                        </select>
                        </div>
                    </div>

                    <!-- price -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Price</label>
                        <div class="mt-2 grid grid-cols-[8%_1fr] w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6">
                            <span class="font-semibold">PHP</span>
                            <input type="number" min="0" name="postal-code" id="postal-code" autocomplete="postal-code" class="focus:outline-0" placeholder="e.g. 30000"/>
                        </div>
                    </div>

                    <!-- total quantity -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                        <div class="mt-2">
                            <input type="number" min="0" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  placeholder="e.g. 100"/>
                        </div>
                    </div>


                    <!-- variant -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Color Variant</label>

                        <div v-for="(variant,index) in totalVariants" :key="index"  class="mt-2 grid grid-cols-[45%_45%_1fr] gap-3">
                            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  placeholder="e.g. Red" v-model="variant.color"/>
                            <input type="number" min="0" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  placeholder="e.g. 10" v-model="variant.quantity"/>
                            <button 
                                class="border border-gray-300 rounded-lg transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer" title="Add variant"
                               @click="removeVariant(index)"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <button 
                            class="border border-gray-300 rounded-lg transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer p-2 text-sm font-dm-sans font-semibold flex items-center justify-center gap-3 mt-3" title="Add variant"
                            @click="totalVariants.push({
                                color: '',
                                quantity: 0
                            })"
                        >
                            <i class="fa-solid fa-plus"></i>
                            Add variant
                        </button>
                    </div>

                    <!-- features -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Features</label>
                        <div class="mt-2">
                            <textarea name="about" id="about" rows="3" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6" placeholder="e.g. Modular, Waterproof, Lightweight"/>
                        </div>
                        <p class="mt-3 text-sm/6 text-gray-600">Kindly separate each feature with a comma (,) like so</p>
                    </div>

                    <!-- Measurements -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Measurements</label>
                        <div v-for="(label,index) in measurementLabels" :key="index"  class="mt-2 grid grid-cols-[30%_1fr]">
                            <span>{{ label }}</span>
                            <input type="number" min="0" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  placeholder="e.g. 210 cm (82.6 in)"/>
                        </div>
                    </div>

                    <!-- photo -->
                    <div class="col-span-full">
                        <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Product photo</label>
                        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div class="text-center">
                            <i class="fa-solid fa-image text-gray-300 text-4xl"></i>
                            <div class="mt-4 flex text-sm/6 text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-[var(--color-gray)] focus-within:ring-2  focus-within:ring-offset-2 focus-within:outline-hidden hover:text-black">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs/5 text-gray-600">PNG, JPG up to 10MB</p>
                        </div>
                        </div>
                    </div>

                    <!-- button -->
                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
                        <button type="submit" class="rounded-md bg-[var(--color-gray)] px-3 py-2 text-sm font-semibold text-white shadow-xs transition delay-100 duration-200 ease-in-out hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>