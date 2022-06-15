import MissingConfigurationValueError from "../errors/MissingConfigurationValueError";
const requireConfig = (isomorphicConfig, key)=>{
    const valueUnderKey = isomorphicConfig[key];
    if (typeof valueUnderKey === "undefined") {
        throw new MissingConfigurationValueError(`Value for configuration key ${key} was undefined.`);
    }
    return valueUnderKey;
};
export default requireConfig;
