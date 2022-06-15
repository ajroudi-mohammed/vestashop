export const fetcher = async ()=>{
    console.log("FETCHER");
    const res = await fetch("./data.json");
    if (res.ok) {
        const { data  } = await res.json();
        return data;
    }
    throw res;
};
