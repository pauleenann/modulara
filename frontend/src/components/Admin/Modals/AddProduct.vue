    <script setup>
        import { computed, onMounted, watch } from 'vue';
        import { sofaCategories } from '@/constants/constants';
        import { measurementLabels } from '@/constants/constants';
        import { useRouter } from 'vue-router';
        import { useProductFormHandler } from '@/composables/products/useProductFormHandler';
        import { useProductApi } from '@/composables/products/useProductApi';
    import { useProductForm } from '@/composables/products/useProductForm';

        const router = useRouter();

        const props = defineProps({
            open: Boolean,
            close: Function,
            productId: String,
            mode: String
        })

        const form = useProductForm();
        const formHandler = useProductFormHandler(form.product);
        const api = useProductApi(form);

        // destructure
        const { product, featureInput, errors, resetForm, loading } = form;
        const { removeVariant, removeExistingPhoto, removeNewPhoto, handleImageUpload } = formHandler;
        const { addProduct, editProduct, getProduct } = api;

        const isDisabled = computed(()=>props.mode == 'view')

        watch(product, () => {
            console.log('Product', product)
        }, { deep: true })

        // trigger this when modal
        watch(() => props.open, () => {
            if(!props.productId){
                return
            }

            if (props.mode!='add') {
                getProduct(props.productId);
            }else{
                resetForm()
            }
        });
    </script>

    <template>
        <div v-if="open" class="bg-gray-500/30 absolute inset-0 flex-center z-10">
            <!-- modal -->
            <div class="bg-white w-180 h-150 rounded-2xl px-5 py-7 overflow-hidden relative">
                <!-- loading overlay -->
                <div v-if="loading" class="absolute inset-0 z-100 bg-white/50 flex-center">   
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <!-- header -->
                <header class="flex justify-between items-center">
                    <h2 class="font-kulim-park font-bold text-2xl text-[var(--color-gray)] capitalize">{{props.mode}} Modulara Product</h2>

                    <!-- close button -->
                    <button       
                        class="h-8 w-8 flex-center hover:bg-gray-300 rounded-full text-[var(--color-gray)] hover:text-white transition delay-50 duration-300 ease-in-out cursor-pointer"
                        @click="()=>{
                            resetForm()
                        props.close()  
                        }"
                    >
                        <i class="text-2xl fa-solid fa-xmark"></i>
                    </button>
                </header>

                <!-- form content -->
                <div class="overflow-y-scroll pb-10 px-2 font-dm-sans w-full h-full">
                    <div class="mt-5 flex flex-col gap-4 font-dm-sans">
                        <!-- product name -->
                        <div class="sm:col-span-4">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Product name</label>
                            <div class="mt-2">
                                <div :class="[
                                    'flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)]',
                                    errors.name?'outline-red-500':'']"
                                >
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                                        placeholder="e.g. Modular Sofa"
                                        v-model="product.name" 
                                        :disabled="isDisabled"
                                        />
                                </div>
                            </div>
                            <p class="error-message">{{ errors.name }}</p>
                        </div>

                        <!-- product description -->
                        <div class="sm:col-span-4">
                            <label for="description" class="block text-sm/6 font-medium text-gray-900">Description</label>
                            <div class="mt-2">
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    rows="3" 
                                    :class="['block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                    errors.description?'outline-red-500':'']" 
                                    placeholder="e.g. A modern, space-saving 3-seater sofa with durable upholstery and customizable modules."
                                    v-model="product.description"
                                    :disabled="isDisabled"/>
                            </div>
                            <p class="error-message">{{ errors.description }}</p>
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
                                :class="['col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                    errors.category?'outline-red-500':''
                                ]"
                                v-model="product.category"
                                :disabled="isDisabled">
                                <option value="" selected disabled>Select category</option>
                                <option 
                                    v-for="(sofa,index) in sofaCategories" 
                                    :key="index"
                                    :value="sofa"
                                >
                                    {{sofa}}
                                </option>
                            </select>
                            </div>
                            <p class="error-message">{{ errors.category }}</p>
                        </div>

                        <!-- price -->
                        <div class="sm:col-span-2">
                            <label for="price" class="block text-sm/6 font-medium text-gray-900">Price</label>
                            <div 
                                :class="['mt-2 grid grid-cols-[8%_1fr] w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                    errors.price?'outline-red-500':''
                                ]"
                            >
                                <span class="font-semibold">PHP</span>
                                <input 
                                    type="number" 
                                    min="0" 
                                    name="price" 
                                    id="price" 
                                    autocomplete="price" class="focus:outline-0" 
                                    placeholder="e.g. 30000"
                                    v-model="product.price"
                                    :disabled="isDisabled"/>
                            </div>
                            <p class="error-message">{{ errors.price }}</p>
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
                                    :class="['block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                        errors.totalQuantity?'outline-red-500':''
                                    ]"  
                                    placeholder="e.g. 100"
                                    v-model="product.totalQuantity"
                                    :disabled="isDisabled"/>
                            </div>
                            <p class="error-message">{{ errors.totalQuantity }}</p>
                        </div>

                        <!-- variant -->
                        <div class="sm:col-span-2">
                            <label for="variants" class="block text-sm/6 font-medium text-gray-900">Color Variant</label>
                            <div 
                                v-for="(variant,index) in product.variants" 
                                :key="index"  
                                :class="[
                                'mt-2 grid gap-3',
                                index!=0?'grid-cols-[30%_30%_30%_1fr]':'grid-cols-3'
                            ]">
                                <input 
                                    type="text" 
                                    name="variantColorName" 
                                    id="variantColorName"
                                    autocomplete="variantColorName" 
                                    :class="[
                                        'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                        errors.variants?'outline-red-500':''
                                    ]"  
                                    placeholder="e.g. Charcoal Gray" 
                                    v-model="variant.name"
                                    :disabled="isDisabled"/>
                                <input 
                                    type="text" 
                                    name="variantColor" 
                                    id="variantColor"
                                    autocomplete="variantColor" 
                                    :class="[
                                        'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                        errors.variants?'outline-red-500':''
                                    ]"  
                                    placeholder="e.g. #444444" 
                                    v-model="variant.color"
                                    :disabled="isDisabled"/>
                                <input 
                                    type="variantQuantity" 
                                    min="0" 
                                    name="variantQuantity" 
                                    id="variantQuantity" 
                                    autocomplete="variantQuantity" 
                                    :class="[
                                        'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                        errors.variants?'outline-red-500':''
                                    ]"  
                                    placeholder="e.g. 10" 
                                    v-model="variant.quantity"
                                    :disabled="isDisabled"/>
                                <button
                                    v-if="index!=0" 
                                    class="border border-gray-300 rounded-lg transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer" title="Add variant"
                                @click="removeVariant(index)"
                                :disabled="isDisabled"
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
                                :disabled="isDisabled">
                                <i class="fa-solid fa-plus"></i>
                                Add variant
                            </button>
                            <p class="error-message">{{ errors.variants }}</p>
                        </div>

                        <!-- features -->
                        <div class="sm:col-span-2">
                            <label for="features" class="block text-sm/6 font-medium text-gray-900">Features</label>
                            <div class="mt-2">
                                <textarea 
                                    name="features" 
                                    id="features" 
                                    rows="3" 
                                    :class="[
                                        'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                        errors.features?'outline-red-500':''
                                    ]" 
                                    placeholder="e.g. Modular, Waterproof, Lightweight"
                                    v-model="featureInput"
                                    :disabled="isDisabled"/>
                            </div>
                            <p class="mt-3 text-sm/6 text-gray-600">Kindly separate each feature with a comma (,) like so</p>
                            <p class="error-message">{{ errors.features }}</p>
                        </div>

                        <!-- Measurements -->
                        <div class="sm:col-span-2">
                            <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Measurements</label>
                            <div 
                                v-for="(label,index) in measurementLabels" 
                                :key="index"  
                                class="mt-2 grid grid-cols-[30%_1fr]"
                            >
                                <span>{{ label.label }}</span>
                                <input 
                                    type="text" 
                                    :name="label.value" 
                                    :id="label.value" 
                                    :autocomplete="label.value" 
                                    :class="[
                                        'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[var(--color-gray)] sm:text-sm/6',
                                        errors.measurements?'outline-red-500':''
                                    ]"  
                                    placeholder="e.g. 210 cm (82.6 in)"
                                    v-model="product.measurements[label.value]"
                                    :disabled="isDisabled"
                                />
                            </div>
                            <p class="error-message">{{ errors.measurements }}</p>
                        </div>

                        <!-- image -->
                        <div class="col-span-full">
                            <label for="image" class="block text-sm/6 font-medium text-gray-900">Product image</label>
                            <div class="mt-2 flex items-center gap-3">
                                <!-- existing images -->
                                <div 
                                    v-for="(image, index) in product.existingImages"
                                    :key="index"
                                    class="w-25 h-25 rounded-lg relative">
                                    <!-- remove button -->
                                    <i 
                                    class="absolute text-red-500 text-xl transition delay-100 duration-200 ease-in-out -right-1 -top-1 cursor-pointer fa-solid fa-circle-xmark"
                                    @click="removeExistingPhoto(index)"
                                    v-if="!isDisabled"
                                    ></i>

                                    <!-- preview -->
                                    <img :src="image.preview" alt="" class="object-cover w-full h-full rounded-lg border border-gray-300">
                                </div>

                                <!-- new images -->
                                <div 
                                    v-for="(image, index) in product.newImages"
                                    :key="index"
                                    class="w-25 h-25 rounded-lg relative">
                                    <!-- remove button -->
                                    <i 
                                    class="absolute text-red-500 text-xl transition delay-100 duration-200 ease-in-out -right-1 -top-1 cursor-pointer fa-solid fa-circle-xmark"
                                    @click="removeNewPhoto(index)"
                                    v-if="!isDisabled"
                                    ></i>

                                    <!-- preview -->
                                    <img :src="image.preview" alt="" class="object-cover w-full h-full rounded-lg border border-gray-300">
                                </div>

                                <!-- add image -->
                                <div 
                                class="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-25 w-25"
                                v-if="!isDisabled">
                                    
                                        <label
                                            class="cursor-pointer" 
                                            for="image"
                                        >
                                            <i class="fa-solid fa-plus text-gray-300 text-4xl"></i>
                                        </label>
                                        <input 
                                            type="file"
                                            id="image"
                                            class="hidden"
                                            @change="handleImageUpload($event)"
                                            :disabled="isDisabled"
                                        >
                                    
                                </div>
                            </div>
                            <p class="error-message">{{ errors.images }}</p>
                        </div>

                        <!-- button -->
                        <div 
                        class="mt-6 flex items-center justify-end gap-x-6"
                        v-if="!isDisabled">
                            <button 
                                type="button" 
                                class="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                                @click="()=>{
                                    resetForm()
                                    props.close()  
                                }"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                class="rounded-md bg-[var(--color-gray)] px-3 py-2 text-sm font-semibold text-white shadow-xs transition delay-100 duration-200 ease-in-out hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
                                @click="
                                props.mode=='edit'
                                ?editProduct(props.close, props.productId):addProduct(props.close)"
                            >
                                {{props.mode=='edit'?'Edit':'Save'}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>