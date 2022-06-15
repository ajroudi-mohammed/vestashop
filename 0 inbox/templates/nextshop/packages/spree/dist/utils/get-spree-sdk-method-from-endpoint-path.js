import SpreeSdkMethodFromEndpointPathError from "../errors/SpreeSdkMethodFromEndpointPathError";
const getSpreeSdkMethodFromEndpointPath = (client, path)=>{
    const pathParts = path.split(".");
    const reachedPath = [];
    let node = client;
    console.log(`Looking for ${path} in Spree Sdk.`);
    while(reachedPath.length < pathParts.length - 1){
        const checkedPathPart = pathParts[reachedPath.length];
        const checkedNode = node[checkedPathPart];
        console.log(`Checking part ${checkedPathPart}.`);
        if (typeof checkedNode !== "object") {
            throw new SpreeSdkMethodFromEndpointPathError(`Couldn't reach ${path}. Farthest path reached was: ${reachedPath.join(".")}.`);
        }
        if (checkedNode === null) {
            throw new SpreeSdkMethodFromEndpointPathError(`Path ${path} doesn't exist.`);
        }
        node = checkedNode;
        reachedPath.push(checkedPathPart);
    }
    const foundEndpointMethod = node[pathParts[reachedPath.length]];
    if (reachedPath.length !== pathParts.length - 1 || typeof foundEndpointMethod !== "function") {
        throw new SpreeSdkMethodFromEndpointPathError(`Couldn't reach ${path}. Farthest path reached was: ${reachedPath.join(".")}.`);
    }
    return foundEndpointMethod.bind(node);
};
export default getSpreeSdkMethodFromEndpointPath;
