<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import ProductInfo from '@/components/Customer/Products/ProductInfo.vue';
    
</script>

<template>
    <div class="w-screen h-screen ">
        <ProductNavbar/>
        
        <div class="h-full absolute top-35 left-0 right-0 m-auto">
            <!-- filter -->
            <div class="w-5/6  m-auto flex flex-col items-center mb-20 font-dm-sans">
                <ProductFilter/>

                <!-- product -->
                <ProductInfo/>
                <!-- customer reviews -->
            </div>  

            

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>