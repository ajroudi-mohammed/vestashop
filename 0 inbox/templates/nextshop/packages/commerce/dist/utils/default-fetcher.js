export const SWRFetcher = ({ options , fetch  })=>fetch(options);
export const mutationFetcher = ({ input , options , fetch ,  })=>fetch({
        ...options,
        body: input
    });
export default SWRFetcher;
