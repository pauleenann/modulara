export const handleIconClick = (path, name, openBasketModalFn, router)=>{
    if(name=='Cart'){
        openBasketModalFn();
    }else{
        router.push(path)
    }
}