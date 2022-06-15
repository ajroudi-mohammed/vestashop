import { useCallback } from "react";
export function emptyHook(options) {
    const useEmptyHook = async ({ id  })=>{
        return useCallback(async function() {
            return Promise.resolve();
        }, []);
    };
    return useEmptyHook;
}
export default emptyHook;
