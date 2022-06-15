import useSignup from "@vercel/commerce/auth/use-signup";
export default useSignup;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher () {
        return null;
    },
    useHook: ({ fetch  })=>()=>()=>{}
};
