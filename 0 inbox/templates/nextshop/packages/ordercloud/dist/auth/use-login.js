import useLogin from "@vercel/commerce/auth/use-login";
export default useLogin;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher () {
        return null;
    },
    useHook: ()=>()=>{
            return async function() {};
        }
};
