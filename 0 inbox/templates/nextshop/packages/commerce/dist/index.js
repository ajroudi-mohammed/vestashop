import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useRef } from "react";
const Commerce = /*#__PURE__*/ createContext({});
export function CoreCommerceProvider({ provider , children  }) {
    const providerRef = useRef(provider);
    // TODO: Remove the fetcherRef
    const fetcherRef = useRef(provider.fetcher);
    // If the parent re-renders this provider will re-render every
    // consumer unless we memoize the config
    const { locale , cartCookie  } = providerRef.current;
    const cfg = useMemo(()=>({
            providerRef,
            fetcherRef,
            locale,
            cartCookie
        }), [
        locale,
        cartCookie
    ]);
    return /*#__PURE__*/ _jsx(Commerce.Provider, {
        value: cfg,
        children: children
    });
}
export function getCommerceProvider(provider) {
    return function CommerceProvider({ children , ...props }) {
        return /*#__PURE__*/ _jsx(CoreCommerceProvider, {
            provider: {
                ...provider,
                ...props
            },
            children: children
        });
    };
}
export function useCommerce() {
    return useContext(Commerce);
}
