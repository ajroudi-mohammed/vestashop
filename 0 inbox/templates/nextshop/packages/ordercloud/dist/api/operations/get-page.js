export default function getPageOperation() {
    async function getPage() {
        return Promise.resolve({});
    }
    return getPage;
};
