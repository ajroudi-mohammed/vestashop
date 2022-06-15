const getVendors = async (config)=>{
    var ref;
    const vendors = ((ref = await config.fetch("attributes", "get", [
        "brand"
    ])) == null ? void 0 : ref.values) ?? [];
    return [
        ...new Set(vendors)
    ].map((v)=>({
            node: {
                entityId: v,
                name: v,
                path: `brands/${v}`
            }
        }));
};
export default getVendors;
