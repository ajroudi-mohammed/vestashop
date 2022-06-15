// TODO: Find a way to get vendors from meta
const getVendors = async (config)=>{
    // const vendors = await fetchAllProducts({
    //   config,
    //   query: getAllProductVendors,
    //   variables: {
    //     first: 100,
    //   },
    // })
    // let vendorsStrings = vendors.map(({ node: { vendor } }) => vendor)
    // return [...new Set(vendorsStrings)].map((v) => {
    //   const id = v.replace(/\s+/g, '-').toLowerCase()
    //   return {
    //     node: {
    //       entityId: id,
    //       name: v,
    //       path: `brands/${id}`,
    //     },
    //   }
    // })
    return [];
};
export default getVendors;
