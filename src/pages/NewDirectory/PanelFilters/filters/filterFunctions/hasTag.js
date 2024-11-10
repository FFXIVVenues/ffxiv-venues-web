export const hasTag = (arg) =>
  (venue) =>
  {
    if (!venue.tags) return false;
    for (let tag of venue.tags) {
      if (!tag) continue;
      if (tag.toLowerCase() === arg.toLowerCase())
        return true;
    }
    return false;
  };