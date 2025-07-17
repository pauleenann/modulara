import { addProductFormValidation } from "@/utils/formValidation";
import { reactive, ref, watch } from "vue";

export const useAddProduct = ()=>{
    const product = reactive({
        name: '',
        description: '',
        category: '',
        price: 0,
        totalQuantity: 0,
        variants: [
            {
                color: '',
                quantity: 0
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
        images:[],
        imagePreview: []
    });

    let featureInput = ref('');
    let errors = reactive({});

    // remove variant
    const removeVariant = (index)=>{
        console.log(index)
        product.variants.splice(index,1);
    }

    // remove photo
    const removePhoto = (index)=>{
        console.log(index)

        // update images array first
        product.images.splice(index,1);

        // update imagePreview array
        product.imagePreview.splice(index,1);
    }

    // add product
    const addProduct = () => {
        const formValidation = addProductFormValidation(product);
      
        console.log(formValidation);
      
        // delete keys in object first
        Object.keys(errors).forEach(key => delete errors[key]);
      
        // Assign new errors reactively
        if (formValidation.isNotValid) {
          Object.assign(errors, formValidation.errors);
        }
    };

    // handle image upload
    const handleImageUpload = (e)=>{
        console.log(e)
        const img = e.target.files[0];
        if(!img) return //if empty, return

        product.images.push(img); //push to product.images
        product.imagePreview.push(URL.createObjectURL(img)); //to render image
    }

    // reset form
    const resetForm = ()=>{
        Object.assign(product,
            {
                name: '',
                description: '',
                category: '',
                price: 0,
                totalQuantity: 0,
                variants: [
                    {
                        color: '',
                        quantity: 0
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
                images:[],
                imagePreview: []
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

    return{
        product,
        featureInput,
        errors,
        removeVariant,
        removePhoto,
        addProduct,
        handleImageUpload,
        resetForm
    }
}