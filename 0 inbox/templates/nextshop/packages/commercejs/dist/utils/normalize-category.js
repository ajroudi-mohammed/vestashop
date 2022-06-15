export function normalizeCategory(commercejsCatgeory) {
    const { id , name , slug  } = commercejsCatgeory;
    return {
        id,
        name,
        slug,
        path: slug
    };
}
