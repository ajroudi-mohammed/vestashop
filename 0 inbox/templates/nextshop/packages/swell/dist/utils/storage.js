export const getCheckoutIdFromStorage = (token)=>{
    if (window && window.sessionStorage) {
        return window.sessionStorage.getItem(token);
    }
    return null;
};
export const setCheckoutIdInStorage = (token, id)=>{
    if (window && window.sessionStorage) {
        return window.sessionStorage.setItem(token, id + "");
    }
};
