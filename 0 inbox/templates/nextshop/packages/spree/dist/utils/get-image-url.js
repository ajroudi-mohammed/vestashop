const getImageUrl = (image, minWidth, _)=>{
    // every image is still resized in vue-storefront-api, no matter what getImageUrl returns
    if (image) {
        const { attributes: { styles  } ,  } = image;
        const bestStyleIndex = styles.reduce((bSIndex, style, styleIndex)=>{
            // assuming all images are the same dimensions, just scaled
            if (bSIndex === null) {
                return 0;
            }
            const bestStyle = styles[bSIndex];
            const widthDiff = +bestStyle.width - minWidth;
            const minWidthDiff = +style.width - minWidth;
            if (widthDiff < 0 && minWidthDiff > 0) {
                return styleIndex;
            }
            if (widthDiff > 0 && minWidthDiff < 0) {
                return bSIndex;
            }
            return Math.abs(widthDiff) < Math.abs(minWidthDiff) ? bSIndex : styleIndex;
        }, null);
        if (bestStyleIndex !== null) {
            return styles[bestStyleIndex].url;
        }
    }
    return null;
};
export default getImageUrl;
