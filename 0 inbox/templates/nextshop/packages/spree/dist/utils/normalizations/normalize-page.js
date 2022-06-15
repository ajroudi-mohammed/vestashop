const normalizePage = (_spreeSuccessResponse, spreePage, commerceLocales)=>{
    // If the locale returned by Spree is not available, search
    // for a similar one.
    const spreeLocale = spreePage.attributes.locale;
    let usedCommerceLocale;
    if (commerceLocales.includes(spreeLocale)) {
        usedCommerceLocale = spreeLocale;
    } else {
        const genericSpreeLocale = spreeLocale.split("-")[0];
        const foundExactGenericLocale = commerceLocales.includes(genericSpreeLocale);
        if (foundExactGenericLocale) {
            usedCommerceLocale = genericSpreeLocale;
        } else {
            const foundSimilarLocale = commerceLocales.find((locale)=>{
                return locale.split("-")[0] === genericSpreeLocale;
            });
            usedCommerceLocale = foundSimilarLocale || spreeLocale;
        }
    }
    return {
        id: spreePage.id,
        name: spreePage.attributes.title,
        url: `/${usedCommerceLocale}/${spreePage.attributes.slug}`,
        body: spreePage.attributes.content
    };
};
export default normalizePage;
