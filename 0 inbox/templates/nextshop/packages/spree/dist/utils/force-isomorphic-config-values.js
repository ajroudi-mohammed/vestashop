import MisconfigurationError from "../errors/MisconfigurationError";
import isServer from "./is-server";
const generateMisconfigurationErrorMessage = (keys)=>`${keys.join(", ")} must have a value before running the Framework.`;
const forceIsomorphicConfigValues = (config, requiredServerKeys, requiredPublicKeys)=>{
    if (isServer) {
        const missingServerConfigValues = requiredServerKeys.filter((requiredServerKey)=>typeof config[requiredServerKey] === "undefined");
        if (missingServerConfigValues.length > 0) {
            throw new MisconfigurationError(generateMisconfigurationErrorMessage(missingServerConfigValues));
        }
    }
    const missingPublicConfigValues = requiredPublicKeys.filter((requiredPublicKey)=>typeof config[requiredPublicKey] === "undefined");
    if (missingPublicConfigValues.length > 0) {
        throw new MisconfigurationError(generateMisconfigurationErrorMessage(missingPublicConfigValues));
    }
    return config;
};
export default forceIsomorphicConfigValues;
