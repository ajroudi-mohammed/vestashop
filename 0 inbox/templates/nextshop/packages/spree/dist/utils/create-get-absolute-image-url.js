import getImageUrl from "./get-image-url";
const createGetAbsoluteImageUrl = (host, useOriginalImageSize = true)=>(image, minWidth, minHeight)=>{
        let url;
        if (useOriginalImageSize) {
            url = image.attributes.transformed_url || null;
        } else {
            url = getImageUrl(image, minWidth, minHeight);
        }
        if (url === null) {
            return null;
        }
        return `${host}${url}`;
    };
export default createGetAbsoluteImageUrl;
