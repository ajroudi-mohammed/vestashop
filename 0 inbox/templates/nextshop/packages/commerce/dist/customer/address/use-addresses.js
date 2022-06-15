import Cookies from "js-cookie";
import { useHook, useSWRHook } from "../../utils/use-hook";
import { useCommerce } from "../..";
export const fetcher = async ({ options , input: { cartId  } , fetch ,  })=>{
    return cartId ? await fetch(options) : null;
};
const fn = (provider)=>{
    var ref, ref1;
    return (ref = provider.customer) == null ? void 0 : (ref1 = ref.address) == null ? void 0 : ref1.useAddresses;
};
const useAddresses = (input)=>{
    const hook = useHook(fn);
    const { cartCookie  } = useCommerce();
    const fetcherFn = hook.fetcher ?? fetcher;
    const wrapper = (context)=>{
        context.input.cartId = Cookies.get(cartCookie);
        return fetcherFn(context);
    };
    return useSWRHook({
        ...hook,
        fetcher: wrapper
    })(input);
};
export default useAddresses;
