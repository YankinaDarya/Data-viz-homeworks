export const xmlFormatter = (xml: any) => {
    const convert = require('xml-js');
    const json = convert.xml2json(xml, {compact: true});
    const formattedResponse = JSON.parse(json);
    const edges = formattedResponse.graphml.graph.edge;
    const config = {};
    const parents = {};
    edges.forEach(({_attributes: {source, target}}) => {
        parents[target] = source;
        if(config[source]) {
            config[source].children.push({
                vertexID: target,
                isChecked: false,
                childrenXCoord: -1,
                childrenYCoord: -1,
            })
        } else {
            config[source] = {
                children: [
                    {
                        vertexID: target,
                        isChecked: false,
                        childrenXCoord: -1,
                        childrenYCoord: -1,
                    },
                ],
                vertexCoord: {XCoord: -1, YCoord: -1},
            }
        }
    });
    return {config, parents};
};