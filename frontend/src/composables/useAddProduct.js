import { authStore } from "@/store/authStore";
import api from "@/utils/api";
import { addProductFormValidation } from "@/utils/formValidation";
import axios from "axios";
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
    let loading = ref(false)
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
    const addProduct = async () => {
        // set loading to true
        loading.value = true;

        const formValidation = addProductFormValidation(product);

        // delete keys in object first
        Object.keys(errors).forEach(key => delete errors[key]);
      
        // return isf not validated
        if (formValidation.isNotValid) {
          Object.assign(errors, formValidation.errors);
          return;
        }

        // formdata can only store strings, files or blobs thats why arrays need to be stringified
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('price', product.price.toString());
        formData.append('totalQuantity', product.totalQuantity.toString());
        formData.append('variants', JSON.stringify(product.variants));
        formData.append('features', JSON.stringify(product.features));
        formData.append('measurements', JSON.stringify(product.measurements));
        product.images.forEach((image, index) => {
            formData.append('images', image); // Make sure backend supports multi-image upload
        });
        console.log(formData)

        try {
            const response = await api.post('http://localhost:5000/api/products/',
                formData
            )

            // alert('product added successfully')
            console.log(response)
            resetForm()
        } catch (error) {
            console.log('Cannot add product. An error occurred: ', error.message);
        } finally{
            loading.value = false;
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
        resetForm,
        loading
    }
}