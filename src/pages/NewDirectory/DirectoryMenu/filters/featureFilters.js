import { hasTag } from "./filterFunctions/hasTag";
import { hasProp } from "./filterFunctions/hasProp";
import { propNotNull } from "./filterFunctions/propNotNull";

export const featureFilters = [
  { name: "Has SyncShell", filter: propNotNull("mareCode") },
  { name: "SFW", filter: hasProp("sfw", true) },
  { name: "Gambling", filter: hasTag("gambling") },
  { name: "Artists", filter: hasTag("artists") },
  { name: "Dancers", filter: hasTag("dancers") },
  { name: "Bards", filter: hasTag("bards") },
  { name: "Twitch DJ", filter: hasTag("twitch dj") },
  { name: "Tarot", filter: hasTag("tarot") },
  { name: "LGBTQIA+ focused", filter: hasTag("LGBTQIA+") },
  { name: "Pillow talk", filter: hasTag("pillow") },
  { name: "Photography", filter: hasTag("photography") },
  { name: "Open stage", filter: hasTag("open stage") },
  { name: "Stylists", filter: hasTag("stylists") },
  { name: "Performances", filter: hasTag("performances") },
  { name: "VIP available", filter: hasTag("vip") },
  { name: "Triple triad", filter: hasTag("triple triad") },
  { name: "Courtesans", filter: hasTag("courtesans") },
  { name: "RP Heavily Encouraged", filter: hasTag("rp heavy", "ic rp only") }
];
