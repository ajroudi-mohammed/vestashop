const getFilterVariables = ({ search , categoryId  })=>{
    let filterVariables = {};
    if (search) {
        filterVariables.query = search;
    }
    if (categoryId) {
        filterVariables["category_id"] = categoryId;
    }
    return filterVariables;
};
const getSortVariables = ({ sort  })=>{
    let sortVariables = {};
    switch(sort){
        case "trending-desc":
        case "latest-desc":
            sortVariables = {
                sortBy: "updated",
                sortDirection: "desc"
            };
            break;
        case "price-asc":
            sortVariables = {
                sortBy: "price",
                sortDirection: "asc"
            };
            break;
        case "price-desc":
            sortVariables = {
                sortBy: "price",
                sortDirection: "desc"
            };
            break;
    }
    return sortVariables;
};
export const getProductSearchVariables = (input)=>{
    const { search , categoryId , sort  } = input;
    const filterVariables = getFilterVariables({
        search,
        categoryId
    });
    const sortVariables = getSortVariables({
        sort
    });
    return {
        ...filterVariables,
        ...sortVariables
    };
};
