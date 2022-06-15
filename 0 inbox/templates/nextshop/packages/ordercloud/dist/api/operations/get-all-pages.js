export default function getAllPagesOperation() {
    async function getAllPages({ config , preview  } = {}) {
        return Promise.resolve({
            pages: []
        });
    }
    return getAllPages;
};
