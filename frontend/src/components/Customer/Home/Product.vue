<script setup>
  import { cartStore } from '@/store/cartStore';
  import { reactive, watch } from 'vue';
  import { RouterLink } from 'vue-router';

  const store = cartStore();
  const props = defineProps({
    product: Object
  });

  const productImage = props.product?.images?.[0] || '';
  const productName = props.product?.name || '';
  const productPrice = props.product?.price || 0;
  const productCategory = props.product?.category || '';

  const productData = reactive({
    product: null,
    variant: null,
    quantity: 1
  });

  // sync with prop when it changes
  watch(
    () => props.product,
    (newVal) => {
      productData.product = newVal || null;
      productData.variant = newVal?.attributes?.variants?.[0].name || null;
    },
    { immediate: true } // runs on mount
  );

</script>


<template>
  <div class="flex flex-col">
    <!-- Image -->
    <RouterLink 
    v-if="props.product"
    :to="`/shop/product/${props.product._id}`"
    class="w-full h-80 lg:h-120 bg-[#f5f5f5] flex-center rounded-2xl p-6">
      <div>
        <img :src="productImage" :alt="productName" class="object-contain" />
      </div>
      
    </RouterLink>
    <div 
    v-else
    class="w-full h-80 lg:h-120 bg-[#f5f5f5] flex-center rounded-2xl p-6">
    </div>

    <!-- Name & Price -->
    <RouterLink 
    :to="`/shop/product/${props.product._id}`"
    v-if="props.product">
      <div class="flex justify-between mt-4 font-medium font-dm-sans text-xl">
        <p>{{ productName }}</p>
        <p>₱{{ productPrice.toLocaleString() }}</p>
      </div>
    </RouterLink>
    <div v-else>
      <div class="flex justify-between mt-4 font-medium font-dm-sans text-xl">
        <p class="h-10 w-60 bg-gray-200 rounded animate-pulse"></p>
        <p class="h-10 w-20 bg-gray-200 rounded animate-pulse"></p>
      </div>
    </div>

    <!-- Category -->
    <div v-if="props.product">
      <p class="text-lg">{{ productCategory }}</p>
    </div>
    <div v-else>
      <div class="mt-2 h-10 w-full bg-gray-300 rounded animate-pulse"></div>
    </div>

    <!-- Add to Basket & Favorite -->
    <div class="">
      <div 
      class="mt-3 flex items-center gap-3"
      v-if="props.product">
        <button 
        @click="store.addToCart({
          productId: productData.product._id,
          variant: productData.variant,
          quantity: productData.quantity
        }, productData.product.name, true)"
        class="bg-[var(--color-gray)] w-10 h-10 rounded-full text-white">
          <i class="fa-solid fa-basket-shopping"></i>
        </button>
        <button>
          <i class="fa-regular fa-heart text-4xl text-[var(--color-gray)]"></i>
        </button>
      </div>
      <div 
      class="mt-3 flex items-center gap-2"
      v-else>
        <div class="bg-gray-400 w-10 h-10 rounded-full animate-pulse"></div>
        <div class="bg-gray-400 w-10 h-10 rounded-full animate-pulse"></div>
      </div>
    </div>

    <!-- color options -->
    <p 
    v-if="props.product"
    class="text-sm mt-3 mb-1 text-gray-500">
      Color options
    </p>
    <div 
    v-if="props.product"
    class="flex gap-2">
      <span 
      v-for="(variant, index) in props.product.attributes.variants" 
      :key="index"
      :class="{
        'h-8 w-8 bg-red-400 rounded-full': true,
        'border border-gray-900': variant.name == productData.variant
      }"
      :style="{ backgroundColor: variant.color }"
      :title="variant.name"
      @click="productData.variant=variant.name"
      ></span>
    </div>
  </div>
</template>
