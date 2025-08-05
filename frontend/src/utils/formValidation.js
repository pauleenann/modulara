import zxcvbn from "zxcvbn";

export const addProductFormValidation = (product)=>{
    let errors = {};
    let isNotValid = false;

    // errors
    errors.name = 
        product.name.trim()===''
        ?'Product name is required'
        :''

    errors.description = 
        product.description.trim()===''
        ?'Product description is required'
        :''

    errors.category = 
        product.category.trim()===''
        ?'Product category is required'
        :''

    errors.price = 
        product.price<=0
        ?'Product price is required'
        :''

    errors.totalQuantity = 
        product.totalQuantity<=0
        ?'Product total quantity is required'
        :''

    const totalVariantQuantity = product.variants.reduce((acc, variant) => acc + Number(variant.quantity), 0);
    const hasEmptyColor = product.variants.some(variant => !variant.color || variant.color.trim() === '');

    errors.variants = 
        product.totalQuantity!=totalVariantQuantity || totalVariantQuantity==0|| hasEmptyColor 
        ?'Variant color is required and total variant quantity must be the same as the product total quantity'
        : ''

    errors.features = 
        product.features.length<=0 
        ? 'Features are required' 
        : ''

    errors.measurements = 
        Object.values(product.measurements).some(value => value.trim() === '') 
        ? 'Fields are required' 
        : ''

    errors.images = 
        product.images.length<=0 
        ? 'Images are required' 
        : ''
    
    console.log(errors)
    console.log(totalVariantQuantity)

    isNotValid = Object.values(errors).some(value => value.trim().length > 0)
    return {
        isNotValid:isNotValid, 
        errors:errors
    }
}
