import useCustomer from "@vercel/commerce/customer/use-customer";
export default useCustomer;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ()=>()=>{
            return async function addItem() {
                return {};
            };
        }
};
