export type ChildrenType = {
    vertexID: string;
    isChecked: boolean;
    childrenXCoord: number;
    childrenYCoord: number;
};

export type VertexType = {
    children: Array<ChildrenType>;
    vertexCoord: VertexCoordType;
};

export type NodeType = {
    id: string;
    x: number;
    y: number;
    fixed: boolean;
};

export type LinkType = {
    source: string;
    target: string;
};

export type GraphDataType = {
    nodes: Array<NodeType>;
    links: Array<LinkType>;
};

export type TreeType = { [key: string]: VertexType };

export type VertexCoordType = {
    XCoord: number;
    YCoord: number;
};
