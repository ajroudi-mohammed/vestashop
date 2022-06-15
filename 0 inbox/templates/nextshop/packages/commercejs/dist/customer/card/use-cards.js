import { useMemo } from "react";
import useCard from "@vercel/commerce/customer/card/use-cards";
export default useCard;
export const handler = {
    fetchOptions: {
        query: "_",
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
