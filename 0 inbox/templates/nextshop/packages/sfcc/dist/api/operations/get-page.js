export default function getPageOperation() {
    function getPage() {
        return Promise.resolve({});
    }
    return getPage;
};
