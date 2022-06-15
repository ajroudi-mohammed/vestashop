const validatePlaceholderImageUrl = (placeholderUrlOrFalse)=>{
    if (!placeholderUrlOrFalse || placeholderUrlOrFalse === "false") {
        return false;
    }
    if (typeof placeholderUrlOrFalse === "string") {
        return placeholderUrlOrFalse;
    }
    throw new TypeError("placeholderUrlOrFalse must be a string or falsy.");
};
export default validatePlaceholderImageUrl;
