<script setup>
    import AdminNavbar from '@/components/Admin/AdminNavbar.vue';
    import AdminSidebar from '@/components/Admin/AdminSidebar.vue';
    import AdminStatsBox from '@/components/Admin/AdminStatsBox.vue';
    // import AddProduct from '@/components/Admin/Modals/AddProduct.vue';
    import { ref } from 'vue';

    const isAddBtnClicked = ref(false)

</script>

<template>
    <div id="inventory" class="relative">
        <!-- navbar -->
        <AdminSidebar/>

        <!-- view -->
        <div class="bg-[#f8f8f8] w-full h-full rounded-xl overflow-hidden flex flex-col gap-5">
            <!-- navbar -->
            <AdminNavbar title="Inventory" />

            <!-- stats of stocks and add product button -->
            <div class="flex justify-between items-end px-5 ">
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
            <div class="px-5 w-full h-full">
                <div class="w-full h-full bg-white rounded-2xl shadow-sm px-10 py-7">
                    <!-- table -->
                    <table class="w-full">
                        <thead>
                            <tr class=" border-b border-gray-100 font-dm-sans">
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]">Product ID</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]">Product name</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]">Category</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]">Price</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]">Stock</td>
                                <td class="pb-3 text-start font-semibold text-[var(--color-light-gray)]"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <!-- product id -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-gray)]">#123456</td>

                                <!-- product name with pic -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-gray)] flex items-center gap-3">
                                    <div class="bg-gray-100 h-10 w-10">
                                        <img src="" alt="" class="">
                                    </div>
                                    <p>Vora Loveseat</p>
                                </td>

                                <!-- product category -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-light-gray)]">
                                    <span class="bg-gray-100 py-1 px-4 rounded-4xl">3-Seater</span>
                                </td>

                                <!-- product price -->
                                <td class="pt-3 text-start font-semibold text-[var(--color-gray)]">
                                    PHP 30,000
                                </td>
                                
                                <!-- stock -->
                                <td class="pt-3 text-start font-semibold text-[#009D59]">
                                    <span class="bg-[#7BF1A8]/30 py-1 px-4 rounded-4xl">In Stock: 124 left</span>
                                    
                                </td>

                                <!-- more button -->
                                <td class="pt-3 text-[var(--color-gray)]">
                                    <button class="cursor-pointer">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- modal -->
        <AddProduct 
            :open="isAddBtnClicked" 
            :close="()=>isAddBtnClicked=false" 
        />
    </div>
</template>