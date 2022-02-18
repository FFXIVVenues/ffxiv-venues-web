const tagFilter = (tagFilter, tagFilter2) => (venues) => venues.filter(v => {
    const tags = (v.venue || v).tags;
    if (!tags) return false;
    for (let tag of tags) {
        if (tag.toLowerCase() === tagFilter)
            return true;
        if (tagFilter2 !== undefined && tag.toLowerCase() === tagFilter)
            return true;
    }
    return false;
});

export const courtesanFilter = tagFilter("courtesans");
export const maidCafeFilter = tagFilter("maid cafe", "host club");
export const bardsFilter = tagFilter("bards");
export const openStageFilter = tagFilter("open stage");