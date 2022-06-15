import { useMemo } from "react";
import useAddresses from "@vercel/commerce/customer/address/use-addresses";
export default useAddresses;
export const handler = {
    fetchOptions: {
        url: "_",
        method: "_"
    },
    useHook: ()=>function useHook() {
            return useMemo(()=>Object.create({}, {
                    isEmpty: {
                        get () {
                            return true;
                        },
                        enumerable: true
                    }
                }), []);
        }
};
