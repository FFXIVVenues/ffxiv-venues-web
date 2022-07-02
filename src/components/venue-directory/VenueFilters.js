export const tagFilter = (...args) => 
    (venues) => venues.filter(v => {
        const tags = (v.venue || v).tags;
        if (!tags) return false;
        for (let tag of tags) {
            if (!tag) continue;
            for (let arg of args) {
                if (tag.toLowerCase() === arg.toLowerCase())
                    return true;
            }
        }
        return false;
    });

export const regionFilter = (region) => (venues) => venues.filter(v => {
    const venue = (v.venue || v);
    switch (region) {
        case "NA":
            return venue.location.dataCenter === "Aether" 
                    || venue.location.dataCenter === "Primal"
                    || venue.location.dataCenter === "Crystal";
        case "JP":
            return venue.location.dataCenter === "Elemental" 
                    || venue.location.dataCenter === "Gaia"
                    || venue.location.dataCenter === "Mana";
        case "EU":
            return venue.location.dataCenter === "Chaos" 
                    || venue.location.dataCenter === "Light"
                    || venue.location.dataCenter === "Phantom";
        case "OC":
            return venue.location.dataCenter === "Materia";
        default:
            return false;
    }
});

export const dataCenterFilter = (dataCenter) => (venues) => venues.filter(v => {
    return (v.venue || v).location.dataCenter === dataCenter;
});

export const worldFilter = (world) => (venues) => venues.filter(v => {
    return (v.venue || v).location.world === world;
});

export const propFilter = (prop, value) => (venues) => venues.filter(v => {
    return (v.venue || v)[prop] === value;
});