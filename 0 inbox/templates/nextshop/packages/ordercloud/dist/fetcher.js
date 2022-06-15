const clientFetcher = async ({ method , url , body  })=>{
    const response1 = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>response.json()).then((response)=>response.data);
    return response1;
};
export default clientFetcher;
