const getMediaGallery = (images, getImageUrl)=>{
    return images.reduce((productImages, _, imageIndex)=>{
        const url = getImageUrl(images[imageIndex], 800, 800);
        if (url) {
            return [
                ...productImages,
                {
                    url
                }
            ];
        }
        return productImages;
    }, []);
};
export default getMediaGallery;
