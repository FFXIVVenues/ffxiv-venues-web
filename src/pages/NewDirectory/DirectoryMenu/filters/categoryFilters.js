import { hasTag } from "./filterFunctions/hasTag";

export const categoryFilters = [
  { name: "Nightclub", filter: hasTag("nightclub") },
  { name: "Den", filter: hasTag("den") },
  { name: "Cafe", filter: hasTag("cafe") },
  { name: "Tavern", filter: hasTag("tavern") },
  { name: "Inn", filter: hasTag("inn") },
  { name: "Lounge", filter: hasTag("lounge") },
  { name: "Bath house", filter: hasTag("bath house") },
  { name: "Restaurant", filter: hasTag("restaurant") },
  { name: "Fight club", filter: hasTag("fightclub") },
  { name: "Shows and Performances", filter: hasTag("shows and performances") },
  { name: "Casino", filter: hasTag("casino") },
  { name: "Shop", filter: hasTag("shop") },
  { name: "Maid cafe / host club", filter: hasTag("maid cafe", "host club") },
  { name: "Other", filter: hasTag("other") }
];
