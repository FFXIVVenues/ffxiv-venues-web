export const propNotNull = (prop) =>
  v => v[prop] !== null && v[prop] !== undefined;