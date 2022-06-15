const getCategories = async (config)=>{
    const data = await config.fetch("categories", "get");
    return data.results.map(({ id , name , slug  })=>({
            id,
            name,
            slug,
            path: `/${slug}`
        })) ?? [];
};
export default getCategories;
