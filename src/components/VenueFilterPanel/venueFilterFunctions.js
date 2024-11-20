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
        return dataCenterFilter("Aether")(v)
          || dataCenterFilter("Crystal")(v)
          || dataCenterFilter("Primal")(v)
          || dataCenterFilter("Dynamis")(v);
      case "JP":
        return dataCenterFilter("Elemental")(v)
          || dataCenterFilter("Gaia")(v)
          || dataCenterFilter("Mana")(v)
          || dataCenterFilter("Meteor")(v);
      case "EU":
        return dataCenterFilter("Chaos")(v)
          || dataCenterFilter("Light")(v);
      case "OC":
        return dataCenterFilter("Materia")(v);
      default:
        return false;
    }
  };

export const dataCenterFilter = (dataCenter) =>
  v => v.location.dataCenter === dataCenter  || v.location.override?.toLowerCase().includes(dataCenter.toLowerCase());

export const worldFilter = (world) =>
  v => v.location.world === world || v.location.override?.toLowerCase().includes(world.toLowerCase());

export const propFilter = (prop, value) =>
  v => v[prop] === value;

export const propNotNull = (prop) =>
  v => v[prop] !== null && v[prop] !== undefined;