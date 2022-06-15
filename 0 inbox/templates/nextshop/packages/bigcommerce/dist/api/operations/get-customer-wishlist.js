export default function getCustomerWishlistOperation({ commerce  }) {
    async function getCustomerWishlist({ config , variables , includeProducts  }) {
        var ref;
        config = commerce.getConfig(config);
        const { data =[]  } = await config.storeApiFetch(`/v3/wishlists?customer_id=${variables.customerId}`);
        const wishlist = data[0];
        if (includeProducts && (wishlist == null ? void 0 : (ref = wishlist.items) == null ? void 0 : ref.length)) {
            var ref1;
            const ids = (ref1 = wishlist.items) == null ? void 0 : ref1.map((item)=>{
                return (item == null ? void 0 : item.product_id) ? String(item == null ? void 0 : item.product_id) : null;
            }).filter((id)=>!!id);
            if (ids == null ? void 0 : ids.length) {
                const graphqlData = await commerce.getAllProducts({
                    variables: {
                        first: 50,
                        ids
                    },
                    config
                });
                // Put the products in an object that we can use to get them by id
                const productsById = graphqlData.products.reduce((prods, p)=>{
                    prods[Number(p.id)] = p;
                    return prods;
                }, {});
                // Populate the wishlist items with the graphql products
                wishlist.items.forEach((item)=>{
                    const product = item && productsById[item.product_id];
                    if (item && product) {
                        // @ts-ignore Fix this type when the wishlist type is properly defined
                        item.product = product;
                    }
                });
            }
        }
        return {
            wishlist: wishlist
        };
    }
    return getCustomerWishlist;
};
