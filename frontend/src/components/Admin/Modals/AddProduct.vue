<script setup>
    import { watch } from 'vue';
    import { sofaCategories } from '@/constants/constants';
    import { measurementLabels } from '@/constants/constants';
    import { useAddProduct } from '@/composables/useAddProduct';

    const props = defineProps({
        open: Boolean,
        close: Function
    })

    const {product, removeVariant, removePhoto, addProduct, handelImageUpload} = useAddProduct();

    watch(product, () => {
        console.log('Product changed:', product)
    }, { deep: true })

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
                        <label for="name" class="block text-sm/6 font-medium text-gray-900">Product name</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)]">
                                <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                                placeholder="e.g. Modular Sofa"
                                v-model="product.name" />
                            </div>
                        </div>
                    </div>

                    <!-- product description -->
                    <div class="sm:col-span-4">
                        <label for="description" class="block text-sm/6 font-medium text-gray-900">Description</label>
                        <div class="mt-2">
                            <textarea 
                            name="description" 
                            id="description" 
                            rows="3" 
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6" 
                            placeholder="e.g. A modern, space-saving 3-seater sofa with durable upholstery and customizable modules."
                            v-model="product.description"/>
                        </div>
                        <p class="mt-3 text-sm/6 text-gray-600">Write a few sentences about this product.</p>
                    </div>

                    <!-- category -->
                    <div class="sm:col-span-3">
                        <label for="category" class="block text-sm/6 font-medium text-gray-900">Category</label>
                        <div class="mt-2 grid grid-cols-1">
                        <select 
                        id="category" 
                        name="category" 
                        autocomplete="category" 
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"
                        v-model="product.category">
                            <option 
                                v-for="(sofa,index) in sofaCategories" 
                                :key="index"
                                :value="sofa"
                            >
                                {{sofa}}
                            </option>
                        </select>
                        </div>
                    </div>

                    <!-- price -->
                    <div class="sm:col-span-2">
                        <label for="price" class="block text-sm/6 font-medium text-gray-900">Price</label>
                        <div class="mt-2 grid grid-cols-[8%_1fr] w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6">
                            <span class="font-semibold">PHP</span>
                            <input 
                            type="number" 
                            min="0" 
                            name="price" 
                            id="price" 
                            autocomplete="price" class="focus:outline-0" 
                            placeholder="e.g. 30000"
                            v-model="product.price"/>
                        </div>
                    </div>

                    <!-- total quantity -->
                    <div class="sm:col-span-2">
                        <label for="totalQuantity" class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                        <div class="mt-2">
                            <input 
                            type="number"
                            min="0" 
                            name="totalQuantity" 
                            id="totalQuantity" 
                            autocomplete="totalQuantity" 
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  
                            placeholder="e.g. 100"
                            v-model="product.totalQuantity"/>
                        </div>
                    </div>


                    <!-- variant -->
                    <div class="sm:col-span-2">
                        <label for="variants" class="block text-sm/6 font-medium text-gray-900">Color Variant</label>
                        <div v-for="(variant,index) in product.variants" :key="index"  :class="['mt-2 grid gap-3',index!=0?'grid-cols-[45%_45%_1fr]':'grid-cols-2']">
                            <input 
                            type="text" 
                            name="variantColor" 
                            id="variantColor"
                            autocomplete="variantColor" 
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  
                            placeholder="e.g. Red" 
                            v-model="variant.color"/>
                            <input 
                            type="variantQuantity" 
                            min="0" 
                            name="variantQuantity" 
                            id="variantQuantity" 
                            autocomplete="variantQuantity" 
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  
                            placeholder="e.g. 10" 
                            v-model="variant.quantity"/>
                            <button
                                v-if="index!=0" 
                                class="border border-gray-300 rounded-lg transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer" title="Add variant"
                               @click="removeVariant(index)"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <button 
                            class="border border-gray-300 rounded-lg transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer p-2 text-sm font-dm-sans font-semibold flex items-center justify-center gap-3 mt-3" 
                            title="Add variant"
                            @click="product.variants.push({
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
                        <label for="features" class="block text-sm/6 font-medium text-gray-900">Features</label>
                        <div class="mt-2">
                            <textarea 
                            name="features" 
                            id="features" 
                            rows="3" 
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6" 
                            placeholder="e.g. Modular, Waterproof, Lightweight"
                            v-model="product.features"/>
                        </div>
                        <p class="mt-3 text-sm/6 text-gray-600">Kindly separate each feature with a comma (,) like so</p>
                    </div>

                    <!-- Measurements -->
                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Measurements</label>
                        <div 
                        v-for="(label,index) in measurementLabels" 
                        :key="index"  class="mt-2 grid grid-cols-[30%_1fr]">
                            <span>{{ label.label }}</span>
                            <input 
                            type="text" 
                            :name="label.value" 
                            :id="label.value" 
                            :autocomplete="label.value" 
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6"  
                            placeholder="e.g. 210 cm (82.6 in)"
                            v-model="product.measurements[label.value]"
                            />
                        </div>
                    </div>

                    <!-- image -->
                    <div class="col-span-full">
                        <label for="image" class="block text-sm/6 font-medium text-gray-900">Product image</label>
                        <div class="mt-2 flex items-center gap-3">
                            <div 
                            v-for="(preview, index) in product.imagePreview"
                            :key="index"
                            class="w-25 h-25 rounded-lg relative">
                                <!-- remove button -->
                                <button 
                                class="absolute h-6 w-6 transition delay-100 duration-200 ease-in-out bg-red-400 hover:bg-red-500 rounded-full text-white -right-1 -top-1 cursor-pointer"
                                @click="removePhoto(index)"
                                >
                                    <i class="fa-solid fa-xmark"></i>
                                </button>

                                <!-- preview -->
                                <img :src="preview" alt="" class="object-cover w-full h-full rounded-lg">
                            </div>
                            <div class="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-25 w-25">
                                
                                    <label
                                    class="cursor-pointer" 
                                    for="image">
                                        <i class="fa-solid fa-plus text-gray-300 text-4xl"></i>
                                    </label>
                                    <input 
                                    type="file"
                                    id="image"
                                    class="hidden"
                                    @change="handelImageUpload"
                                    >
                                
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