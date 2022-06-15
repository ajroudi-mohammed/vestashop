import * as query from "./queries";
const getCategories = async (config)=>{
    var ref, ref1;
    const { data  } = await config.fetch(query.CollectionMany, {
        variables: {
            first: 100
        }
    });
    return ((ref = data.collections) == null ? void 0 : (ref1 = ref.edges) == null ? void 0 : ref1.map(({ node: { id , name , slug  }  })=>({
            id,
            name,
            slug,
            path: `/${slug}`
        }))) ?? [];
};
export default getCategories;
