import getAllProductVendors from "./queries/get-all-product-vendors-query";
const getBrands = async (config)=>{
    const { data  } = await config.fetch(getAllProductVendors, {
        variables: {
            first: 250
        }
    });
    let vendorsStrings = data.products.edges.map(({ node: { vendor  }  })=>vendor);
    return [
        ...new Set(vendorsStrings)
    ].map((v)=>{
        const id = v.replace(/\s+/g, "-").toLowerCase();
        return {
            node: {
                entityId: id,
                name: v,
                path: `brands/${id}`
            }
        };
    });
};
export default getBrands;
