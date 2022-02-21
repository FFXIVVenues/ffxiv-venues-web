export const tagFilter = (...args) => 
    (venues) => venues.filter(v => {
        const tags = (v.venue || v).tags;
        if (!tags) return false;
        for (let tag of tags) {
            for (let arg of args) {
                if (tag.toLowerCase() === arg.toLowerCase())
                    return true;
            }
        }
        return false;
    });


export const worldFilter = (world) => (venues) => venues.filter(v => {
    return (v.venue || v).location.indexOf(world) !== -1;
});

export const propFilter = (prop, value) => (venues) => venues.filter(v => {
    return (v.venue || v)[prop] === value;
});