export const isRegion = (region) =>
  (venue) =>{
    switch (region) {
      case "na":
        return venue.location.dataCenter === "Aether"
          || venue.location.dataCenter === "Crystal"
          || venue.location.dataCenter === "Primal"
          || venue.location.dataCenter === "Dynamis";
      case "jp":
        return venue.location.dataCenter === "Elemental"
          || venue.location.dataCenter === "Gaia"
          || venue.location.dataCenter === "Mana"
          || venue.location.dataCenter === "Meteor";
      case "eu":
        return venue.location.dataCenter === "Chaos"
          || venue.location.dataCenter === "Light";
      case "oc":
        return venue.location.dataCenter === "Materia";
      default:
        return false;
    }
  };