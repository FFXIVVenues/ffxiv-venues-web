export const hasProp = (prop) =>
  (venue) =>
    venue[prop] !== null && venue[prop] !== undefined;