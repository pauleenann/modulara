<script setup>
  import { cartStore } from '@/store/cartStore';
  import { favoriteStore } from '@/store/favoriteStore';
  import { computed, reactive, watch } from 'vue';
  import { RouterLink } from 'vue-router';

  const storeCart = cartStore();
  const storeFave = favoriteStore();
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
    quantity: 1,
  });
  const isFavorite = computed(()=>storeFave.isFavorite(productData.product?._id)); //checks if product is added to favorites

  const toggleFavorite = () => {
    if (!productData.product) return;

    if (isFavorite.value) {
      storeFave.removeToFaves(productData.product._id);
    } else {
      storeFave.addToFaves(
        productData.product._id,
        productData.product.name,
        true
      );
    }
  };

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
    class="w-full h-100 bg-[#f5f5f5] flex-center rounded-2xl p-15">
      <div>
        <img :src="productImage" :alt="productName" class="object-contain" />
      </div>
      
    </RouterLink>

    <!-- Name & Price -->
    <RouterLink 
    :to="`/shop/product/${props.product._id}`"
    v-if="props.product">
      <div class="flex justify-between mt-4 font-medium font-dm-sans text-xl">
        <p>{{ productName }}</p>
        <p>₱{{ productPrice.toLocaleString() }}</p>
      </div>
    </RouterLink>

    <!-- Category -->
    <div v-if="props.product">
      <p class="text-lg">{{ productCategory }}</p>
    </div>

    <!-- Add to Basket & Favorite -->
    <div class="">
      <div 
      class="mt-3 flex items-center gap-3"
      v-if="props.product">
        <button 
        @click="storeCart.addToCart({
          productId: productData.product._id,
          variant: [productData.variant],
          quantity: productData.quantity
        }, productData.product.name, true)"
        class="bg-[var(--color-gray)] w-10 h-10 rounded-full text-white cursor-pointer">
          <i class="fa-solid fa-basket-shopping"></i>
        </button>
        <button
        class="cursor-pointer"
        @click="toggleFavorite">
          <i :class='[
           isFavorite ? "fa-solid text-pink-600" : "fa-regular text-[var(--color-gray)]",
            "fa-heart text-4xl transition duration-200 ease-in-out"
          ]'></i>
        </button>
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
