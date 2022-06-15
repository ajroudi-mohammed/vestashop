import { jsx as _jsx } from "react/jsx-runtime";
import { CoreCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { spreeProvider } from "./provider";
import { SWRConfig } from "swr";
import handleTokenErrors from "./utils/handle-token-errors";
import useLogout from "@vercel/commerce/auth/use-logout";
export { spreeProvider };
export const WithTokenErrorsHandling = ({ children  })=>{
    const logout = useLogout();
    return /*#__PURE__*/ _jsx(SWRConfig, {
        value: {
            onError: (error, _key)=>{
                handleTokenErrors(error, ()=>void logout());
            }
        },
        children: children
    });
};
export const getCommerceProvider = (provider)=>{
    return function CommerceProvider({ children , ...props }) {
        return /*#__PURE__*/ _jsx(CoreCommerceProvider, {
            provider: {
                ...provider,
                ...props
            },
            children: /*#__PURE__*/ _jsx(WithTokenErrorsHandling, {
                children: children
            })
        });
    };
};
export const CommerceProvider = getCommerceProvider(spreeProvider);
export const useCommerce = ()=>useCoreCommerce();
