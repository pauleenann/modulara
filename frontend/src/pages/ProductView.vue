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
    import { useRoute } from 'vue-router';
    import { useProductForm } from '@/composables/products/useProductForm';
    import { useProductApi } from '@/composables/products/useProductApi';
    import { onMounted } from 'vue';

    const route = useRoute();
    const id = route.params.id;
    const form = useProductForm();
    const api = useProductApi(form);

    const {product} = form;
    const {getProduct} = api;

    onMounted(async ()=>{
        await getProduct(id);
        console.log(product)
    })

</script>

<template>
    <div class="w-screen h-screen">
        <ProductNavbar/>
        
        <div class="h-full absolute top-30 lg:top-35 left-0 right-0 m-auto">
            <!-- filter -->
            <div class="w-5/6  m-auto flex flex-col items-center mb-20 font-dm-sans">
                <ProductFilter/>

                <!-- product -->
                <ProductInfo :product="product"/>

                <!-- customer reviews -->
                <CustomerReviews/>

                <!-- features -->
                <ProductFeatures :features="product.features"/>

                <!-- measurement -->
                <ProductMeasurement :measurements="product.measurements"/>

                <!-- other products -->
                <!-- <OtherProducts/> -->
            </div>  

            

            <!-- footer -->
            <Footer/>
        </div>
        
    </div>
</template>