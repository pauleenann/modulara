import router from "@/routes/routes";
import api from "@/utils/api";
import { addProductFormValidation } from "@/utils/formValidation";
import { computed, reactive, ref, watch } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAddProduct = ()=>{
    const product = reactive({
        name: '',
        description: '',
        category: '',
        price: null,
        totalQuantity: null,
        variants: [
            {
                color: '',
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
    let loading = ref(false)
    let errors = reactive({});

    // remove variant
    const removeVariant = (index)=>{
        console.log(index)
        product.variants.splice(index,1);
    }

    // remove existing photo
    const removeExistingPhoto = (index)=>{
        product.existingImages.splice(index,1);
    }

    // remove new photo
    const removeNewPhoto = (index)=>{
        product.newImages.splice(index,1);
    }
    
    // add product
    const addProduct = async (close) => {
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
        product.newImages.forEach((image, index) => {
            formData.append('images', image.file); // Make sure backend supports multi-image upload
        });
        console.log(formData)

        try {
            const response = await api.post('/products/',
                formData
            )

            // reset form
            // resetForm()

            // toast notification
            toast.success("Product added successfully!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });

            // navigate to /admin/inventory
            close();
        } catch (error) {
            console.log('Cannot add product. An error occurred: ', error.message);
        } finally{
            loading.value = false;
        }
    };

    // edit product
    const editProduct = async (close,id) => {
        console.log('hello')

        if(!isEdited.value){
            toast.warning("Product not edited!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
            return
        }

        const formValidation = addProductFormValidation(product, 'edit');
        console.log(errors)

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
        product.newImages.forEach(image=> {
            formData.append('images', image.file); // Make sure backend supports multi-image upload
        });
        product.existingImages.forEach(existing => {
            formData.append('existing', existing.file); // Make sure backend supports multi-image upload
        });
        console.log(formData)

        try {
            // set loading to true
            loading.value = true; 

            const response = await api.put(`/products/${id}`,
                formData
            )

            // reset form
            resetForm()

            // toast notification
            toast.success("Product edited successfully!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });

            // navigate to /admin/inventory
            close();
        } catch (error) {
            console.log('Cannot edit product. An error occurred: ', error);
        } finally{
            loading.value = false;
        }
    };

    // handle image upload
    const handleImageUpload = (e)=>{
        console.log(e)
        const img = e.target.files[0];
        if(!img) return //if empty, return

        product.newImages.push({
            file: img,
            preview: URL.createObjectURL(img)
        });
    }

    // const getProducts = async (products = ref([]))=>{
    //     try {
    //         const response = await api.get("/products/");
    //         if(response.data.products.length==0){
    //             console.log('No products available')
    //             return 
    //         }

    //         products.value = response.data.products;
    //     } catch (error) {
    //         console.log('An error occurred: ', error);
    //     }
    // }

    const getProduct = async (id) => {
        try {
            const response = await api.get(`/products/${id}`)
            const data = response.data.product
            
            Object.assign(product, {
                name: data.name,
                description: data.description,
                category: data.category,
                price: data.price,
                totalQuantity: data.totalQuantity,
                variants: data.attributes.variants,
                measurements: data.attributes.measurements,
                existingImages: data.images.map(img => ({
                    file: img,
                    preview: img
                })),
                features: data.attributes.features
            })
    
            // deep clone so it won't change with product
            originalProduct.value = JSON.stringify(product);
            featureInput.value = data.attributes.features.join(', ')
        } catch (error) {
            console.log('An error occurred: ', error)
        }
    }

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

    return{
        product,
        featureInput,
        errors,
        removeVariant,
        removeExistingPhoto,
        removeNewPhoto,
        addProduct,
        editProduct,
        handleImageUpload,
        getProduct,
        resetForm,
        loading
    }
}