import swell from "../../swell";
const fetchApi = async (query, method, variables = [])=>{
    return swell[query][method](...variables);
};
export default fetchApi;
