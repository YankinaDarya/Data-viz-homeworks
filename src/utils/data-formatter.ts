import {TreeType} from "./constants";

export const dataFormatter = (tree: TreeType) => {
    const treeParents = Object.keys(tree);
    const nodes = [];
    const edges = [];
    treeParents.forEach(key => {
        const {children, vertexCoord: {XCoord, YCoord}} = tree[key];
        if(nodes.findIndex((node) => node.id === key) === -1) {
            nodes.push({x: XCoord * 100, y: -YCoord * 100, id: key, title: key, type: 'empty'});
        }
        children.forEach(({vertexID, childrenXCoord, childrenYCoord}) => {
            edges.push({ source: key, target: vertexID, type: "emptyEdge" });
            if(nodes.findIndex((node) => node.id === vertexID) === -1) {
                nodes.push({x: childrenXCoord * 100, y: -childrenYCoord * 100, id: vertexID, title: vertexID, type: 'empty'})
            }
        })
    });
    return {nodes, edges}
};