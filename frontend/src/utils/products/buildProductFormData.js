export const buildProductFormData = (product)=>{
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
    return formData;
}