import { reactive } from "vue";

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

    // remove variant
    const removeVariant = (index)=>{
        console.log(index)
        const updatedVariant = product.variants.filter((item, key) => key !== index)
        product.variants = updatedVariant;
    }

    // remove photo
    const removePhoto = (index)=>{
        console.log(index)

        // update images array first
        const updatedImages = product.images.filter((item, key) => key !== index)
        product.images = updatedImages;

        // update imagePreview array
        const updatedImagePreview = product.imagePreview.filter((item, key) => key !== index)
        product.imagePreview = updatedImagePreview;
    }

    const addProduct = () => {

    }

    // handle image upload
    const handelImageUpload = (e)=>{
        console.log(e)
        const img = e.target.files[0];
        if(!img) return //if empty, return

        product.images.push(img); //push to product.images
        product.imagePreview.push(URL.createObjectURL(img)); //to render image
    }

    return{
        product,
        removeVariant,
        removePhoto,
        addProduct,
        handelImageUpload
    }
}