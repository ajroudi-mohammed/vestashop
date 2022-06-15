const isJsonContentType = (contentType)=>contentType.includes("application/json") || contentType.includes("application/vnd.api+json");
export default isJsonContentType;
