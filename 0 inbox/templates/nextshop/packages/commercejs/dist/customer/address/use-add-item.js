import { useCallback } from "react";
import useAddItem from "@vercel/commerce/customer/address/use-add-item";
import { useCheckoutContext } from "@components/checkout/context";
export default useAddItem;
export const handler = {
    fetchOptions: {
        query: "_",
        method: "_"
    },
    useHook: ()=>function useHook() {
            const { setAddressFields  } = useCheckoutContext();
            return useCallback(async function addItem(input) {
                setAddressFields(input);
                return undefined;
            }, [
                setAddressFields
            ]);
        }
};
