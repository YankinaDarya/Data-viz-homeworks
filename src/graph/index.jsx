import React from "react";
import {
    GraphView, // required
} from 'react-digraph';

const GraphConfig = {
    NodeTypes: {
        empty: { // required to show empty nodes
            typeText: "None",
            shapeId: "#empty", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="empty" key="0">
                    <circle cx="50" cy="50" r="10" />
                </symbol>
            )
        },
    },
    NodeSubtypes: {},
    EdgeTypes: {
        emptyEdge: {  // required to show empty edges
            shapeId: "#emptyEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="currentColor" />
                </symbol>
            )
        }
    }
}

const NODE_KEY = "id"       // Allows D3 to correctly update DOM

export class MyGraph extends React.Component<data> {
    render() {
        const NodeTypes = GraphConfig.NodeTypes;
        const NodeSubtypes = GraphConfig.NodeSubtypes;
        const EdgeTypes = GraphConfig.EdgeTypes;

        return (
            <div id='graph' style={{height: '100vh', width: '100%'}}>
                <GraphView ref='GraphView'
                           nodeKey={NODE_KEY}
                           nodes={this.props.data.nodes}
                           edges={this.props.data.edges}
                           nodeTypes={NodeTypes}
                           nodeSubtypes={NodeSubtypes}
                           edgeTypes={EdgeTypes}
                           allowMultiselect={true}
                />
            </div>
        );
    }

}