import api from "@/utils/api";
import { addProductFormValidation } from "@/utils/formValidation";
import { buildProductFormData } from "@/utils/products/buildProductFormData";
import { toastNotification } from "@/utils/products/toastNotification";
import { ref } from "vue";

export const useProductApi = (form=null)=>{
    const removeLoading = ref(false);

    // add product
    const addProduct = async (close) => {
        const { product, errors, resetForm, loading } = form; 

        loading.value = true;

        try {
            // form validation
            const formValidation = addProductFormValidation(product);
            Object.keys(errors).forEach(key => delete errors[key]);
            if (formValidation.isNotValid) {
            Object.assign(errors, formValidation.errors);
            return;
            }

            const formData = buildProductFormData(product);
            await api.post('/products/', formData)
            resetForm(); // reset form if req is finished
            toastNotification("Product added successfully!","success"); // display toart
            close();
        } catch (error) {
            console.log('Cannot add product. An error occurred: ', error.message);
            toastNotification("Cannot add product! Please try again later.","warning");
        } finally{
            loading.value = false;
        }
    };

    // edit product
    const editProduct = async (close,id) => {
        const { product, errors, resetForm, isEdited, loading } = form;

        loading.value = true; 

        try {

            if(!isEdited.value){
                toastNotification("Product not edited!","warning")
                return
            }
    
            // form validation
            const formValidation = addProductFormValidation(product, 'edit');
            Object.keys(errors).forEach(key => delete errors[key]);
            if (formValidation.isNotValid) {
              Object.assign(errors, formValidation.errors);
              return;
            }
    
            // form data
            const formData = buildProductFormData(product);
            product.existingImages.forEach(existing => {
                formData.append('existing', existing.file);
            });
            await api.put(`/products/${id}`, formData)
            resetForm();
            toastNotification("Product edited successfully!", "success");
            close();
        } catch (error) {
            console.log('Cannot edit product. An error occurred: ', error);
            toastNotification("Cannot edit product! Please try again later.", "warning")
        } finally{
            loading.value = false;
        }
    };

    // get product
    const getProduct = async (id) => {
        const { product, loading, originalProduct, featureInput } = form;
            
        loading.value = true;

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
        }finally {
            loading.value = false;
        }
    }

    // remove product
    const removeProduct = async (close,id)=>{
        try {
            removeLoading.value = true;

            // delete product req
            await api.delete(`/products/${id}`);
            toastNotification("Product removed successfully!", "success");
            close();
        } catch (error) {
            console.log('An error occurred: ', error)
            toastNotification("Cannot remove product! Please try again later.", "warning");
        }finally{
            removeLoading.value = false;
        }
    }

    return {
        addProduct,
        editProduct,
        getProduct,
        removeProduct,
        removeLoading
    }
}