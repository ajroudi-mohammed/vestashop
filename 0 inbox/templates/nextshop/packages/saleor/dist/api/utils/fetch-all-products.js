const fetchAllProducts = async ({ config , query , variables , acc =[] , cursor  })=>{
    var ref, ref1, ref2;
    const { data  } = await config.fetch(query, {
        variables: {
            ...variables,
            cursor
        }
    });
    const edges = ((ref = data.products) == null ? void 0 : ref.edges) ?? [];
    const hasNextPage = (ref1 = data.products) == null ? void 0 : (ref2 = ref1.pageInfo) == null ? void 0 : ref2.hasNextPage;
    acc = acc.concat(edges);
    if (hasNextPage) {
        var ref3;
        const cursor = (ref3 = edges.pop()) == null ? void 0 : ref3.cursor;
        if (cursor) {
            return fetchAllProducts({
                config,
                query,
                variables,
                acc,
                cursor
            });
        }
    }
    return acc;
};
export default fetchAllProducts;
