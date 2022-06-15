import { defaultOperations, OPERATIONS } from "./operations";
export class CommerceAPICore {
    constructor(provider){
        this.provider = provider;
    }
    getConfig(userConfig = {}) {
        return Object.entries(userConfig).reduce((cfg, [key, value])=>Object.assign(cfg, {
                [key]: value
            }), {
            ...this.provider.config
        });
    }
    setConfig(newConfig) {
        Object.assign(this.provider.config, newConfig);
    }
}
export function getCommerceApi(customProvider) {
    const commerce = Object.assign(new CommerceAPICore(customProvider), defaultOperations);
    const ops = customProvider.operations;
    OPERATIONS.forEach((k)=>{
        const op = ops[k];
        if (op) {
            commerce[k] = op({
                commerce
            });
        }
    });
    return commerce;
}
export function getEndpoint(commerce, context) {
    const cfg = commerce.getConfig(context.config);
    return function apiHandler(req, res) {
        return context.handler({
            req,
            res,
            commerce,
            config: cfg,
            handlers: context.handlers,
            options: context.options ?? {}
        });
    };
}
export const createEndpoint = (endpoint)=>(commerce, context)=>{
        return getEndpoint(commerce, {
            ...endpoint,
            ...context
        });
    };
