import data from "../../data.json";
export default function getAllProductPathsOperation() {
    function getAllProductPaths() {
        return Promise.resolve({
            products: data.products.map(({ path  })=>({
                    path
                }))
        });
    }
    return getAllProductPaths;
};
