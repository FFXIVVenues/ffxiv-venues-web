export const tagFilter = (...args) =>
  v => {
    const tags = v.tags;
    if (!tags) return false;
    for (let tag of tags) {
      if (!tag) continue;
      for (let arg of args) {
        if (tag.toLowerCase() === arg.toLowerCase())
          return true;
      }
    }
    return false;
  };

export const regionFilter = (region) =>
  v => {
    switch (region) {
      case "NA":
        return v.location.dataCenter === "Aether"
          || v.location.dataCenter === "Crystal"
          || v.location.dataCenter === "Primal"
          || v.location.dataCenter === "Dynamis";
      case "JP":
        return v.location.dataCenter === "Elemental"
          || v.location.dataCenter === "Gaia"
          || v.location.dataCenter === "Mana"
          || v.location.dataCenter === "Meteor";
      case "EU":
        return v.location.dataCenter === "Chaos"
          || v.location.dataCenter === "Light"
          ;
      case "OC":
        return v.location.dataCenter === "Materia";
      default:
        return false;
    }
  };

export const dataCenterFilter = (dataCenter) =>
  v => v.location.dataCenter === dataCenter;

export const worldFilter = (world) =>
  v => v.location.world === world;

export const propFilter = (prop, value) =>
  v => v[prop] === value;

export const propNotNull = (prop) =>
  v => v[prop] !== null && v[prop] !== undefined;