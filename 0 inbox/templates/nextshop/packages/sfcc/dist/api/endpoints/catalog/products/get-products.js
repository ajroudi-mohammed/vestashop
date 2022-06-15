import { normalizeSearchProducts } from "../../../utils/normalise-product";
const getProducts = async ({ req , res , body: { search , categoryId , brandId , sort  } , config ,  })=>{
    const { sdk  } = config;
    // 'clothing' is our main category default, and a manually set category has priority
    const searchTerm = categoryId ? categoryId : search || "clothing";
    const searchClient = await sdk.getSearchClient();
    // use SDK search API for initial products
    const searchResults = await searchClient.productSearch({
        parameters: {
            q: searchTerm,
            limit: 20
        }
    });
    let products = [];
    let found = false;
    if (searchResults.total) {
        found = true;
        products = normalizeSearchProducts(searchResults.hits);
    }
    res.status(200).json({
        data: {
            products,
            found
        }
    });
};
export default getProducts;
