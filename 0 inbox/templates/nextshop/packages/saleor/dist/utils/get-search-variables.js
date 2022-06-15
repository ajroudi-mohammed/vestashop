import { getSortVariables } from "./get-sort-variables";
export const getSearchVariables = ({ brandId , search , categoryId , sort  })=>{
    const sortBy = {
        field: "NAME",
        direction: "ASC",
        ...getSortVariables(sort, !!categoryId),
        channel: "default-channel"
    };
    return {
        categoryId,
        filter: {
            search
        },
        sortBy
    };
};
export default getSearchVariables;
