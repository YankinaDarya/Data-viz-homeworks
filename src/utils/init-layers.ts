export type LayersType = {
  [key: string]: {
    leftCoordinate: number;
    rightCoordinate: number;
  };
};

export const initLayers = (layersNumber: number): LayersType => {
  const layers = {};
  for (let i = 0; i < layersNumber; i += 1) {
    layers[i] = { leftCoordinate: -1, rightCoordinate: -1 };
  }

  return layers;
};
