export const handleIconClick = (path, name, openBasketModalFn, router)=>{
    if(name=='Cart'){
        openBasketModalFn();
        console.log('cart clicked')
    }else{
        router.push(path)
    }
}