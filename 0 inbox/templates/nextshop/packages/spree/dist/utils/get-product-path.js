const getProductPath = (partialSpreeProduct)=>{
    return `/${partialSpreeProduct.attributes.slug}`;
};
export default getProductPath;
