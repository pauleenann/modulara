<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Product from '@/components/Customer/Home/Product.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import { useRoute } from 'vue-router';
    import { computed, watch } from 'vue';
    import { useQuery } from '@tanstack/vue-query';
    import { getProducts } from '@/services/products';
    
    const route = useRoute();
    const searchQuery = computed(() => route.query.search)
    
    const {isPending, isFetching, isError, data, error}=useQuery({
        queryKey: computed(()=>["products",searchQuery.value]),
        queryFn: ()=>getProducts(searchQuery.value)
    })
 
    watch(data, (val) => {
        console.log("Products data:", val)
    })
</script>

<template>
    <div class="w-screen h-screen ">
        <ProductNavbar/>
        
        <div class="absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <div class="w-5/6 m-auto flex flex-col items-center mb-20">
                <!-- filter -->
                <ProductFilter/>

                <!-- loading -->

                <!-- result text and sort button -->
                <!-- <div class="mt-13 flex justify-between items-end font-dm-sans w-full">
                    <div>
                        <h1 class="text-2xl lg:text-4xl capitalize"></h1>
                        <p>Showing 1 of 100 results</p>
                    </div>

                    <button 
                    class="border border-[#D9D9D9] text-[var(--color-gray)] rounded py-2 px-3 transition duration-300 ease-in-out hover:bg-[#D9D9D9] cursor-pointer font-dm-sans">
                      <i class="fa-solid fa-filter block md:hidden"></i>
                    </button>
                </div> -->

                <!-- is fetching -->
                <div
                class="mt-20 w-full h-100 flex items-center justify-center font-medium"
                v-if="isFetching">
                    Searching for sofas...
                </div>

                <!-- products -->
                <div
                class="w-full grid grid-cols-3 gap-10 mt-15"
                v-else-if="data.length>0">
                    <Product 
                    class="product" 
                    v-for="product in data"
                    :key="product._id"
                    :product="product"/>
                </div>

                <!-- no data -->
                <div
                class="mt-20 w-full h-100 flex items-center justify-center font-medium"
                v-else>
                    Product not available
                </div>
            </div>  

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>