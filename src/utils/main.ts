import {initLayers} from './init-layers';
import {findRoot} from './find-root';
import { dataFormatter } from './data-formatter';

type PropsType = {
    depth: number;
    vertexID: string;
    tree: any;
    parents: any;
    layers: any;
};

const tmp = ({depth, vertexID, tree, parents, layers}: PropsType) => {
    // если есть потомки у ребенка
    if (tree[vertexID]) {
        // если все потомки отрисованы, рисуем вершину, иначе спускаемся вниз
        const undrawnChild = tree[vertexID].children.find(ch => !ch.isChecked);
        if (!undrawnChild) {
            // draw parent
            const childrenNum = tree[vertexID].children.length;
            const firstChildXCoord = tree[vertexID].children[0].childrenXCoord;
            const lastChildXCoord =
                tree[vertexID].children[childrenNum - 1].childrenXCoord;
            // находим макс.правую координату:
            const tmpXCoord =
                tree[vertexID].children.length === 1
                    ? 0
                    : (lastChildXCoord - firstChildXCoord) / 2;

            const newXCoord = tmpXCoord + firstChildXCoord
            tree[vertexID].vertexCoord.YCoord = depth;
            tree[vertexID].vertexCoord.XCoord = newXCoord;
            // обновляем координату слоя:
            layers[depth].rightCoordinate = newXCoord;
            // mark isChecked
            // @ts-ignore
            const parentID = parents[vertexID];
            // если не root:
            if (tree[parentID]) {
                const childIndex = tree[parentID].children.findIndex(
                    child => child.vertexID === vertexID,
                );
                tree[parentID].children[childIndex].isChecked = true;
                tree[parentID].children[childIndex].childrenXCoord = newXCoord;
                tree[parentID].children[childIndex].childrenYCoord = depth;
                // поднимаемся
                // @ts-ignore
                tmp({
                    depth: depth + 1,
                    vertexID: parents[vertexID],
                    tree,
                    parents,
                    layers

                });
            }
        } else {
            const newDepth = depth - 1;
            tmp({
                depth: newDepth,
                vertexID: undrawnChild.vertexID,
                tree,
                parents,
                layers
            });
        }
    } else {
        // draw children
        // у = depth
        // @ts-ignore
        const parentID = parents[vertexID];
        let XCoord;

        // находим макс.правую координату:
        let maxRightCoordinate = -1;
        for (let i = 0; i < Object.keys(layers).length; i+=1) {
            if(layers[i].rightCoordinate > maxRightCoordinate) {
                maxRightCoordinate = layers[i].rightCoordinate
            }
        }
        if (
            tree[parentID].children.length === 1 &&
            depth !== Object.keys(tree).length
        ) {
            XCoord =
                maxRightCoordinate === -1
                    ? 0
                    : maxRightCoordinate + 2;
        } else {
            XCoord =
                maxRightCoordinate === -1
                    ? 0
                    : maxRightCoordinate + 2;
            // обновляем координату слоя:
            layers[depth].rightCoordinate =
                layers[depth].rightCoordinate === -1
                    ? 0
                    : XCoord;
        }
        // ищем индекс ребенка в дереве:
        const childIndex = tree[parentID].children.findIndex(
            child => child.vertexID === vertexID,
        );
        // обновляем координаты:
        tree[parentID].children[childIndex].childrenXCoord = XCoord;
        tree[parentID].children[childIndex].childrenYCoord = depth;
        // mark isChecked
        tree[parentID].children[childIndex].isChecked = true;

        // поднимаемся
        // @ts-ignore
        tmp({
            depth: depth + 1,
            vertexID: parents[vertexID],
            tree,
            parents,
            layers
        });
    }
};

export const main = (tree, parents) => {
    const rootID = findRoot(parents);
    const depth = Object.keys(tree).length;
    const layers = initLayers(Object.keys(tree).length + 1);
    tmp({depth, vertexID: rootID, tree, parents, layers});
    return dataFormatter(tree);
};
