<script setup>
    import AdminNavbar from '@/components/Admin/AdminNavbar.vue';
    import AdminSidebar from '@/components/Admin/AdminSidebar.vue';
    import AdminStatsBox from '@/components/Admin/AdminStatsBox.vue';
    import InventoryRow from '@/components/Admin/InventoryRow.vue';
    import AddProduct from '@/components/Admin/Modals/AddProduct.vue';
    import ProductConfirmationModal from '@/components/Admin/Modals/ProductConfirmationModal.vue';
    import { useProductApi } from '@/composables/products/useProductApi';
    import { usePagination } from '@/composables/usePagination';
    import { productsStore } from '@/store/productsStore';
    import { computed, onMounted, ref } from 'vue';

    var isModalOpen = ref(false);
    var isRemoveModalOpen = ref(false);
    var productToRemove = ref('');
    var modalMode = ref('Add');
    var productId = ref(null);
    var isOpen = ref(false); // for edit, view, remove modal
    const store = productsStore();
    const products = computed(() => store.products);
    const {
        totalPage,
        currentPage,
        filtered,
        next, 
        prev
    } = usePagination(products, 8)
    const { removeProduct } = useProductApi();

    // get products right away when page renders
    onMounted(()=>{
       store.getProducts();
    });

    const handleToggle = (id)=>{
        isOpen.value = !isOpen.value;
        productId.value = id; // id of toggled btn
    }

    const handleClick = (mode)=>{
        isOpen.value = !isOpen.value; //close modal of edit, view, remove
        isModalOpen.value = !isModalOpen.value
        modalMode.value = mode
    }

    const handleRemove = (name)=>{
        isOpen.value = !isOpen.value;
        isRemoveModalOpen.value = !isRemoveModalOpen.value;
        productToRemove.value = name;
    }
</script>

<template>
    <div id="inventory" class="relative">
        <!-- navbar -->
        <AdminSidebar/>

        <!-- view -->
        <div class="bg-[#f8f8f8] w-full h-full rounded-xl overflow-y-scroll flex flex-col gap-5">
            <!-- navbar -->
            <AdminNavbar title="Inventory" />

            <!-- stats of stocks and add product button -->
            <div class="flex justify-between items-end px-5">
                <div class="flex gap-4">
                    <!-- high stocks -->
                    <AdminStatsBox title="High Stocks" total="100" icon="fa-solid fa-arrow-trend-up" hexColor="#7BF1A8"/>

                    <!-- low stocks -->
                    <AdminStatsBox title="Low Stocks" total="100" icon="fa-solid fa-arrow-trend-down" hexColor="#E63946"/>
                </div>

                <!-- add product button -->
                <button 
                    class="flex-center text-white bg-[var(--color-gray)] gap-3 font-dm-sans py-3 px-5 rounded cursor-pointer transition duration-300 delay-100 ease-in-out hover:bg-gray-950"
                    @click="handleClick('add')"
                >
                    <i class="fa-solid fa-circle-plus"></i>
                    Add Product
                </button>
            </div>

            <!-- product list (table) -->
            <div class="px-5 w-full h-full mb-5">
                <div class="w-full h-full bg-white rounded-2xl shadow-sm px-10 py-7 flex flex-col justify-between">
                    <!-- table -->
                    <table class="w-full">
                        <thead>
                            <tr class=" border-b border-gray-100 font-dm-sans">
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)] w-70">Product ID</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)] w-90">Product name</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)] w-50">Category</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)] w-50">Price</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)] w-50">Stock</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]"></td>
                            </tr>
                        </thead>
                        <tbody>
                           <InventoryRow
                           v-for="product in filtered"
                           :key="product._id"
                           :product="product"
                           @toggle="handleToggle"
                           @edit="handleClick('edit')"
                           @view="handleClick('view')"
                           @remove="handleRemove"
                           :isOpen="productId==product._id && isOpen"
                           />
                        </tbody>
                    </table>

                    <!-- pagination -->
                    <div class="text-sm mt-8 font-semibold text-gray-500 flex items-center justify-between">
                        <!-- pages -->
                        <div>
                            Page {{ currentPage }} of {{ totalPage }}
                        </div>

                        <!-- button -->
                        <div class="flex items-center gap-3">
                            <button 
                            class="cursor-pointer hover:text-gray-800"
                            @click="prev">
                                Prev
                            </button>
                            <button 
                            class="cursor-pointer hover:text-gray-800"
                            @click="next">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- add, edit, view product -->
        <AddProduct
            :open="isModalOpen"
            :close="() => {
                store.getProducts()
                isModalOpen = false;
            }"
            :productId="productId"
            :mode="modalMode"
        />

        <!-- remove product confirmation -->
        <ProductConfirmationModal
            :open="isRemoveModalOpen"
            :close="()=>{
                store.getProducts();
                isRemoveModalOpen=false
            }"
            message="Are you sure you want to remove"
            :name="productToRemove"
            :action="(close)=>removeProduct(close,productId)"
            submitButtonName="Remove"
            
        />
    </div>
</template>