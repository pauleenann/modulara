export const useProductFormHandler = (product)=>{
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

    return {
        removeVariant,
        removeExistingPhoto,
        removeNewPhoto,
        handleImageUpload
    }
}