import getSortVariables from "./get-sort-variables";
export const getSearchVariables = ({ brandId , search , categoryId , sort , locale  })=>{
    let query = "";
    if (search) {
        query += `product_type:${search} OR title:${search} OR tag:${search} `;
    }
    if (brandId) {
        query += `${search ? "AND " : ""}vendor:${brandId}`;
    }
    return {
        categoryId,
        query,
        ...getSortVariables(sort, !!categoryId),
        ...locale && {
            locale
        }
    };
};
export default getSearchVariables;
