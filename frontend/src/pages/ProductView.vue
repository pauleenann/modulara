<script setup>
    import ProductNavbar from '@/components/Customer/Products/ProductNavbar.vue';
    import ProductFilter from '@/components/Customer/Products/ProductFilter.vue';
    import Footer from '@/components/Customer/Home/Footer.vue';
    import ProductInfo from '@/components/Customer/Products/ProductInfo.vue';
    import CustomerReviews from '@/components/Customer/Products/CustomerReviews.vue';
    import { sampleProduct } from '@/constants/constants';
    import ProductFeatures from '@/components/Customer/Products/ProductFeatures.vue';
    import ProductMeasurement from '@/components/Customer/Products/ProductMeasurement.vue';
    import OtherProducts from '@/components/Customer/Products/OtherProducts.vue';

</script>

<template>
    <div class="w-screen h-screen">
        <ProductNavbar/>
        
        <div class="h-full absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <!-- filter -->
            <div class="w-5/6  m-auto flex flex-col items-center mb-20 font-dm-sans">
                <ProductFilter/>

                <!-- product -->
                <ProductInfo :product="sampleProduct"/>

                <!-- customer reviews -->
                <CustomerReviews/>

                <!-- features -->
                <ProductFeatures :features="sampleProduct.attributes.features"/>

                <!-- measurement -->
                <ProductMeasurement :measurements="sampleProduct.attributes.measurements"/>

                <!-- other products -->
                <OtherProducts/>
            </div>  

            

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>