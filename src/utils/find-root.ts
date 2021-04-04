export const findRoot = parents => {
  let rootID = Object.keys(parents)[0];
  while (parents[rootID]) {
    rootID = parents[rootID];
  }

  return rootID;
};
