<script setup>
    import CartItem from './CartItem.vue'
    import { computed, onMounted, reactive, ref, watch } from 'vue'
    import { getCartDetails } from '@/services/cart'
    import { cartStore } from '@/store/cartStore'

    const props = defineProps({
        open: Boolean,
        close: Function
    })
    const store = cartStore();
    const cartItemInfo = reactive([]);
    const loading = ref(false);
    const totalPrice = computed(() => {
        return store.cart.reduce((sum, item) => {
            const detail = cartItemInfo.find(info => item.productId === info._id);
            return sum + (detail ? detail.price * item.quantity : 0);
        }, 0); 
    });
    const deliveryFee = ref(50);
    const subtotal = computed(()=>totalPrice.value+deliveryFee.value)


    const fetchCartDetails = async () => {
        console.log('cart from cart: ',store.cart)
        if (!store.cart.length) return
        loading.value = true
        try {
            const ids = store.cart.map(item => item.productId);
            console.log(ids)
            const { data } = await getCartDetails(ids);

            // remove existing items in cart and replace with fetched data
            cartItemInfo.splice(0, cartItemInfo.length, ...data.cartDetails)
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    // run fetchCartDetails on mount
    onMounted(fetchCartDetails)

    // run whenever cart changes
    watch(
        () => store.cartTotal,
        () => fetchCartDetails(),
    )

    const handleProductDetail = (item) => {
        if (!item) return
        return cartItemInfo.find(detail => detail._id === item.productId)
    }
</script>


<template>
    <div 
    :class="[
        'h-full w-full bg-gray-100/50 fixed z-10',
        props.open ? 'translate-x-0' : 'translate-x-full'
    ]"
    >
        <div 
        :class="[
            'absolute right-0 z-75 bg-white w-full lg:w-130 h-screen overflow-y-scroll p-8 transition-transform duration-300 ease-in-out shadow-2xl',
            props.open ? 'translate-x-0' : 'translate-x-full',
        ]">
            <!-- exit -->
            <div class="text-end">
                <button 
                @click="props.close"
                class="cursor-pointer">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </button>
            </div>
            
            <!-- display if cart is not empty -->
            <div
            v-if="store.cartTotal>0"
            class="">
                <!-- your cart -->
                <div 
                class="mt-5 flex flex-col gap-4">
                    <h1 class="font-dm-sans text-2xl font-semibold">Your Cart</h1>
                    <!-- items -->
                    <CartItem 
                        v-for="item in store.cart"
                        :key="item.productId"
                        :item="item"
                        :productDetail="handleProductDetail(item)"
                    />
                </div>

                <!-- order summary -->
                <div 
                class="font-dm-sans text-[var(--color-gray)] mt-8 flex flex-col gap-2">
                    <h2 class="text-lg font-bold">Order Summary</h2>
                    <div class="grid grid-cols-2 flex flex-col gap-2">
                        <!-- product -->
                        <p>Products ({{ store.cartTotal || 0 }})</p>
                        <p class="text-end">₱{{ totalPrice.toLocaleString() }}</p>
                        <!-- delivery price -->
                        <p>Delivery price</p>
                        <p class="text-end">₱{{ deliveryFee }}</p>
                    </div>
                    <hr>
                    <div class="grid grid-cols-2 flex flex-col gap-2 font-semibold">
                        <!-- subtotal -->
                        <p class="text-xl">Subtotal</p>
                        <p class="text-end text-2xl">₱{{ subtotal.toLocaleString() }}</p>
                    </div>
                    <!-- proceed to checkout btn -->
                    <button class="text-white bg-[var(--color-gray)] hover:bg-[#1f1f1f] p-4 font-semibold rounded-3xl mt-3 mb-10 cursor-pointer transform duration-300 ease-in-out text-sm">
                        Proceed to checkout
                    </button>
                </div>  
            </div>
            <div 
            v-else
            class="w-full h-full flex items-center justify-center">
                <p class="font-medium">Your cart is empty  </p>
            </div>
            

        </div>      
    </div>
    
</template>