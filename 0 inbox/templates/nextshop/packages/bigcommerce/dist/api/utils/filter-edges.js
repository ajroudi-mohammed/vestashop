export default function filterEdges(edges) {
    return (edges == null ? void 0 : edges.filter((edge)=>!!edge)) ?? [];
};
