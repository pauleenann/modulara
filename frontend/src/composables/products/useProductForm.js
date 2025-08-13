import { computed, reactive, ref, watch } from "vue";

export const useProductForm = ()=>{
    const product = reactive({
        name: '',
        description: '',
        category: '',
        price: null,
        totalQuantity: null,
        variants: [
            {
                color: '',
                name: '',
                quantity: null
            }
        ],
        features: [],
        measurements:{
            overallWidth: '',
            depth: '',
            height: '',
            seatHeight: '',
            seatDepth: '',
            armHeight: '',
            legHeight: ''
        },
        existingImages: [],
        newImages:[],
    });
    const originalProduct = ref(null);
    const isEdited = computed(() => {
        return JSON.stringify(product) !== originalProduct.value
    });
    let featureInput = ref('');
    let errors = reactive({});
    let loading = ref(false);

    // reset form
    const resetForm = ()=>{
        Object.assign(product,
            {
                name: '',
                description: '',
                category: '',
                price: null,
                totalQuantity: null,
                variants: [
                    {
                        color: '',
                        name:'',
                        quantity: null
                    }
                ],
                features: [],
                measurements:{
                    overallWidth: '',
                    depth: '',
                    height: '',
                    seatHeight: '',
                    seatDepth: '',
                    armHeight: '',
                    legHeight: ''
                },
                existingImages: [],
                newImages:[],
            }
        )

        featureInput.value = '';
        Object.keys(errors).forEach(key=> delete errors[key])
    }

    // handle features (turns string to array)
    watch(featureInput,(value)=>{
        product.features = value.split(',').map(f => f.trim())
        .filter(f => f !== '')
    })

    return {
        product,
        originalProduct,
        isEdited,
        featureInput,
        errors,
        resetForm,
        loading
    }
}