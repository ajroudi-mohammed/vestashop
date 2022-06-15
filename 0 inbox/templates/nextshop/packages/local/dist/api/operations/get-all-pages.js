export default function getAllPagesOperation() {
    function getAllPages({ config , preview  }) {
        return Promise.resolve({
            pages: []
        });
    }
    return getAllPages;
};
