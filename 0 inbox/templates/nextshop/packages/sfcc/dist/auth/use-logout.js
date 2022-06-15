import useLogout from "@vercel/commerce/auth/use-logout";
export default useLogout;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher () {
        return null;
    },
    useHook: ({ fetch  })=>()=>async ()=>{}
};
