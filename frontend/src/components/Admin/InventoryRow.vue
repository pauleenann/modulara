<script setup>

    const props = defineProps({
        product: Object,
        isOpen: Boolean,
    });
    const emit = defineEmits(['toggle', 'edit', 'view', 'remove']);

</script>

<template>
    <tr class="relative">
        <!-- product id -->
        <td class="pt-3 text-start font-semibold text-[var(--color-gray)]">#{{props.product._id}}</td>

        <!-- product name with pic -->
        <td class="pt-3 text-start font-semibold text-[var(--color-gray)] flex items-center gap-3">
            <div class="bg-gray-100 h-10 w-10 flex-center p-1">
                <img :src="props.product.images[0]" alt="" class="">
            </div>
            <p>{{props.product.name}}</p>
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
            <button 
             class="cursor-pointer"
            @click="emit('toggle', props.product._id)">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </td> 

        <!-- modal -->
        <div 
        class="absolute right-5 bg-white shadow w-30 z-1 rounded top-10"
        v-if="props.isOpen">
            <ul >
                <li 
                @click="emit('edit')"
                class="py-1 px-3 hover:bg-gray-100 cursor-pointer text-sm">
                    Edit
                </li>
                <li 
                @click="emit('view')"
                class="py-1 px-3 hover:bg-gray-100 cursor-pointer text-sm">
                    View
                </li>
                <li 
                @click="emit('remove', props.product.name)"
                class="py-1 px-3 hover:bg-gray-100 cursor-pointer text-sm">
                    Remove
                </li>
            </ul>
        </div>
    </tr>
</template>