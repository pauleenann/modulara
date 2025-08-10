<script setup>
    import AdminNavbar from '@/components/Admin/AdminNavbar.vue';
    import AdminSidebar from '@/components/Admin/AdminSidebar.vue';
    import AdminStatsBox from '@/components/Admin/AdminStatsBox.vue';
    import AddProduct from '@/components/Admin/Modals/AddProduct.vue';
    import { usePagination } from '@/composables/usePagination';
    import { productChoices } from '@/constants/constants';
    import api from '@/utils/api';
    import { onMounted, ref } from 'vue';

    const isAddBtnClicked = ref(false);
    let products = ref([]);
    const {
        totalPage,
        currentPage,
        filtered,
        next, 
        prev
    } = usePagination(products, 8)

    // get products right away when page renders
    onMounted(()=>{
        getProducts();
    });

    // get products
    const getProducts = async ()=>{
        try {
            const response = await api.get("/products/");
            if(response.data.products.length==0){
                console.log('No products available')
                return 
            }

            products.value = response.data.products;

            console.log(products)
        } catch (error) {
            console.log('An error occurred: ', error);
        }
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
                    @click="isAddBtnClicked=true"
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
                            <tr 
                            class="relative"
                            v-for="product in filtered"
                            :key="product._id">
                                <!-- product id -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-gray)]">#{{product._id}}</td>

                                <!-- product name with pic -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-gray)] flex items-center gap-3">
                                    <div class="bg-gray-100 h-10 w-10 flex-center p-1">
                                        <img :src="product.images[0]" alt="" class="">
                                    </div>
                                    <p>{{product.name}}</p>
                                </td>

                                <!-- product category -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-light-gray)]">
                                    <span class="bg-gray-100 py-1 px-4 rounded-4xl">{{ product.category }}</span>
                                </td>

                                <!-- product price -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-gray)]">
                                    PHP {{ (product.price).toLocaleString() }}
                                </td>
                                
                                <!-- stock -->
                                <td class="pt-3 text-start font-semibold text-[#009D59]">
                                    <span 
                                    class="bg-[#7BF1A8]/30 py-1 px-4 rounded-4xl"
                                    v-if="product.totalQuantity>0">
                                        In Stock: {{product.totalQuantity}} left
                                    </span>
                                    <span 
                                    class="bg-red-500/30 py-1 px-4 rounded-4xl"
                                    v-else>
                                        Out of Stock
                                    </span>
                                    
                                </td>

                                <!-- more button -->
                                <td class="pt-3 text-[var(--color-gray)]">
                                    <button class="cursor-pointer">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>
                                </td> 

                                <!--  -->
                                <div class="absolute right-0 top-10 z-100  bg-white shadow p-3">
                                    <ul 
                                    v-for="(choice, index) in productChoices"
                                    :key="index">
                                        <li>{{ choice.name }}</li>
                                    </ul>
                                </div>
                            </tr>
                            
                           
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

        <AddProduct
        :open="isAddBtnClicked"
        :close="()=>{
            isAddBtnClicked=false;
            getProducts();
        }"/>
    
    </div>
</template>