import { propFilter, tagFilter, worldFilter, dataCenterFilter, regionFilter, propNotNull } from "./venueFilterFunctions";

export const regionFilters = [
  { key: Symbol(), label: "North America", filter: regionFilter("NA") },
  { key: Symbol(), label: "Europe", filter: regionFilter("EU") },
  // { key: Symbol(), label: "Japan", filter: regionFilter("JP") },
  { key: Symbol(), label: "Oceania", filter: regionFilter("OC") }
];

export const dataCenterFilters = [
  { key: Symbol(), label: "Aether", filter: dataCenterFilter("Aether") },
  { key: Symbol(), label: "Primal", filter: dataCenterFilter("Primal") },
  { key: Symbol(), label: "Crystal", filter: dataCenterFilter("Crystal") },
  { key: Symbol(), label: "Dynamis", filter: dataCenterFilter("Dynamis") },
  // { key: Symbol(), label: "Elemental", filter: dataCenterFilter("Elemental") },
  // { key: Symbol(), label: "Gaia", filter: dataCenterFilter("Gaia") },
  // { key: Symbol(), label: "Mana", filter: dataCenterFilter("Mana") },
  { key: Symbol(), label: "Chaos", filter: dataCenterFilter("Chaos") },
  { key: Symbol(), label: "Light", filter: dataCenterFilter("Light") },
  { key: Symbol(), label: "Materia", filter: dataCenterFilter("Materia") },
];

export const worldFilters = [
  { key: Symbol(), label: "Cactuar", filter: worldFilter("Cactuar") },
  { key: Symbol(), label: "Adamantoise", filter: worldFilter("Adamantoise") },
  { key: Symbol(), label: "Gilgamesh", filter: worldFilter("Gilgamesh") },
  { key: Symbol(), label: "Jenova", filter: worldFilter("Jenova") },
  { key: Symbol(), label: "Faerie", filter: worldFilter("Faerie") },
  { key: Symbol(), label: "Siren", filter: worldFilter("Siren") },
  { key: Symbol(), label: "Sargatanas", filter: worldFilter("Sargatanas") },
  { key: Symbol(), label: "Midgardsormr", filter: worldFilter("Midgardsormr") },

  { key: Symbol(), label: "Behemoth", filter: worldFilter("Behemoth") },
  { key: Symbol(), label: "Excalibur", filter: worldFilter("Excalibur") },
  { key: Symbol(), label: "Exodus", filter: worldFilter("Exodus") },
  { key: Symbol(), label: "Famfrit", filter: worldFilter("Famfrit") },
  { key: Symbol(), label: "Hyperion", filter: worldFilter("Hyperion") },
  { key: Symbol(), label: "Lamia", filter: worldFilter("Lamia") },
  { key: Symbol(), label: "Leviathan", filter: worldFilter("Leviathan") },
  { key: Symbol(), label: "Ultros", filter: worldFilter("Ultros") },

  { key: Symbol(), label: "Balmung", filter: worldFilter("Balmung") },
  { key: Symbol(), label: "Brynhildr", filter: worldFilter("Brynhildr") },
  { key: Symbol(), label: "Coeurl", filter: worldFilter("Coeurl") },
  { key: Symbol(), label: "Diabolos", filter: worldFilter("Diabolos") },
  { key: Symbol(), label: "Goblin", filter: worldFilter("Goblin") },
  { key: Symbol(), label: "Malboro", filter: worldFilter("Malboro") },
  { key: Symbol(), label: "Mateus", filter: worldFilter("Mateus") },
  { key: Symbol(), label: "Zalera", filter: worldFilter("Zalera") },

  { key: Symbol(), label: "Halicarnassus", filter: worldFilter("Halicarnassus") },
  { key: Symbol(), label: "Maduin", filter: worldFilter("Maduin") },
  { key: Symbol(), label: "Marilith", filter: worldFilter("Marilith") },
  { key: Symbol(), label: "Seraph", filter: worldFilter("Seraph") },
  { key: Symbol(), label: "Cuchulainn", filter: worldFilter("Cuchulainn") },
  { key: Symbol(), label: "Golem", filter: worldFilter("Golem") },
  { key: Symbol(), label: "Kraken", filter: worldFilter("Kraken") },
  { key: Symbol(), label: "Rafflesia", filter: worldFilter("Rafflesia") },

  { key: Symbol(), label: "Cerberus", filter: worldFilter("Cerberus") },
  { key: Symbol(), label: "Louisoix", filter: worldFilter("Louisoix") },
  { key: Symbol(), label: "Moogle", filter: worldFilter("Moogle") },
  { key: Symbol(), label: "Omega", filter: worldFilter("Omega") },
  { key: Symbol(), label: "Phantom", filter: worldFilter("Phantom") },
  { key: Symbol(), label: "Ragnarok", filter: worldFilter("Ragnarok") },
  { key: Symbol(), label: "Sagittarius", filter: worldFilter("Sagittarius") },
  { key: Symbol(), label: "Spriggan", filter: worldFilter("Spriggan") },

  { key: Symbol(), label: "Alpha", filter: worldFilter("Alpha") },
  { key: Symbol(), label: "Lich", filter: worldFilter("Lich") },
  { key: Symbol(), label: "Odin", filter: worldFilter("Odin") },
  { key: Symbol(), label: "Phoenix", filter: worldFilter("Phoenix") },
  { key: Symbol(), label: "Raiden", filter: worldFilter("Raiden") },
  { key: Symbol(), label: "Shiva", filter: worldFilter("Shiva") },
  { key: Symbol(), label: "Twintania", filter: worldFilter("Twintania") },
  { key: Symbol(), label: "Zodiark", filter: worldFilter("Zodiark") },

  { key: Symbol(), label: "Bismarck", filter: worldFilter("Bismarck") },
  { key: Symbol(), label: "Ravana", filter: worldFilter("Ravana") },
  { key: Symbol(), label: "Sephirot", filter: worldFilter("Sephirot") },
  { key: Symbol(), label: "Sophia", filter: worldFilter("Sophia") },
  { key: Symbol(), label: "Zurvan", filter: worldFilter("Zurvan") }
];

export const typeFilters = [
  { key: Symbol(), label: "Nightclub", filter: tagFilter("nightclub") },
  { key: Symbol(), label: "Den", filter: tagFilter("den") },
  { key: Symbol(), label: "Cafe", filter: tagFilter("cafe") },
  { key: Symbol(), label: "Tavern", filter: tagFilter("tavern") },
  { key: Symbol(), label: "Inn", filter: tagFilter("inn") },
  { key: Symbol(), label: "Lounge", filter: tagFilter("lounge") },
  { key: Symbol(), label: "Bath house", filter: tagFilter("bath house") },
  { key: Symbol(), label: "Restaurant", filter: tagFilter("restaurant") },
  { key: Symbol(), label: "Fight club", filter: tagFilter("fightclub") },
  { key: Symbol(), label: "Shows and Performances", filter: tagFilter("shows and performances") },
  { key: Symbol(), label: "Casino", filter: tagFilter("casino") },
  { key: Symbol(), label: "Shop", filter: tagFilter("shop") },
  { key: Symbol(), label: "Maid cafe / host club", filter: tagFilter("maid cafe", "host club") },
  { key: Symbol(), label: "Other", filter: tagFilter("other") }
];

export const featureFilters = [
  { key: Symbol(), label: "Has SyncShell", filter: propNotNull("mareCode") },
  { key: Symbol(), label: "SFW", filter: propFilter("sfw", true) },
  { key: Symbol(), label: "Gambling", filter: tagFilter("gambling") },
  { key: Symbol(), label: "Artists", filter: tagFilter("artists") },
  { key: Symbol(), label: "Dancers", filter: tagFilter("dancers") },
  { key: Symbol(), label: "Bards", filter: tagFilter("bards") },
  { key: Symbol(), label: "Twitch DJ", filter: tagFilter("twitch dj") },
  { key: Symbol(), label: "Tarot", filter: tagFilter("tarot") },
  { key: Symbol(), label: "LGBTQIA+ focused", filter: tagFilter("LGBTQIA+") },
  { key: Symbol(), label: "Pillow talk", filter: tagFilter("pillow") },
  { key: Symbol(), label: "Photography", filter: tagFilter("photography") },
  { key: Symbol(), label: "Open stage", filter: tagFilter("open stage") },
  { key: Symbol(), label: "Stylists", filter: tagFilter("stylists") },
  { key: Symbol(), label: "Performances", filter: tagFilter("performances") },
  { key: Symbol(), label: "VIP available", filter: tagFilter("vip") },
  { key: Symbol(), label: "Triple triad", filter: tagFilter("triple triad") },
  { key: Symbol(), label: "Courtesans", filter: tagFilter("courtesans") },
  { key: Symbol(), label: "RP Heavily Encouraged", filter: tagFilter("rp heavy", "ic rp only") }
];
