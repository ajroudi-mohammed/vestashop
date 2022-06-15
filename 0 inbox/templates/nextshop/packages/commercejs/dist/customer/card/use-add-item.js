import { useCallback } from "react";
import useAddItem from "@vercel/commerce/customer/card/use-add-item";
import { useCheckoutContext } from "@components/checkout/context";
export default useAddItem;
export const handler = {
    fetchOptions: {
        url: "_",
        method: "_"
    },
    useHook: ()=>function useHook() {
            const { setCardFields  } = useCheckoutContext();
            return useCallback(async function addItem(input) {
                setCardFields(input);
                return undefined;
            }, [
                setCardFields
            ]);
        }
};
