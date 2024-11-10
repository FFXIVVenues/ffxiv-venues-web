import {isRegion} from "./filterFunctions/isRegion";
import {isDataCenter} from "./filterFunctions/isDataCenter";
import {isWorld} from "./filterFunctions/isWorld";

export const worldFilters = [
  {
    name: "North America",
    filter: isRegion("na"),
    options: [
      {
        name: "Aether",
        filter: isDataCenter("Aether"),
        options: [
          {
            name: "Adamantoise",
            filter: isWorld("Adamantoise")
          },
          {
            name: "Cactuar",
            filter: isWorld("Cactuar")
          },
          {
            name: "Faerie",
            filter: isWorld("Faerie")
          },
          {
            name: "Gilgamesh",
            filter: isWorld("Gilgamesh")
          },
          {
            name: "Jenova",
            filter: isWorld("Jenova")
          },
          {
            name: "Midgardsormr",
            filter: isWorld("Midgardsormr")
          },
          {
            name: "Sargatanas",
            filter: isWorld("Sargatanas")
          },
          {
            name: "Siren",
            filter: isWorld("Siren")
          }
        ]
      },
      {
        name: "Crystal",
        filter: isDataCenter("Crystal"),
        options: [
          {
            name: "Balmung",
            filter: isWorld("Balmung")
          },
          {
            name: "Brynhildr",
            filter: isWorld("Brynhildr")
          },
          {
            name: "Coeurl",
            filter: isWorld("Coeurl")
          },
          {
            name: "Diabolos",
            filter: isWorld("Diabolos")
          },
          {
            name: "Goblin",
            filter: isWorld("Goblin")
          },
          {
            name: "Malboro",
            filter: isWorld("Malboro")
          },
          {
            name: "Mateus",
            filter: isWorld("Mateus")
          },
          {
            name: "Zalera",
            filter: isWorld("Zalera")
          }
        ]
      },
      {
        name: "Primal",
        filter: isDataCenter("Primal"),
        options: [
          {
            name: "Behemoth",
            filter: isWorld("Behemoth")
          },
          {
            name: "Excalibur",
            filter: isWorld("Excalibur")
          },
          {
            name: "Exodus",
            filter: isWorld("Exodus")
          },
          {
            name: "Famfrit",
            filter: isWorld("Famfrit")
          },
          {
            name: "Hyperion",
            filter: isWorld("Hyperion")
          },
          {
            name: "Lamia",
            filter: isWorld("Lamia")
          },
          {
            name: "Leviathan",
            filter: isWorld("Leviathan")
          },
          {
            name: "Ultros",
            filter: isWorld("Ultros")
          }
        ]
      },
      {
        name: "Dynamis",
        filter: isDataCenter("Dynamis"),
        options: [
          {
            name: "Halicarnassus",
            filter: isWorld("Halicarnassus")
          },
          {
            name: "Maduin",
            filter: isWorld("Maduin")
          },
          {
            name: "Marilith",
            filter: isWorld("Marilith")
          },
          {
            name: "Seraph",
            filter: isWorld("Seraph")
          }
        ]
      }
    ]
  },
  {
    name: "Europe",
    filter: isRegion("eu"),
    options: [
      {
        name: "Chaos",
        filter: isDataCenter("Chaos"),
        options: [
          {
            name: "Cerberus",
            filter: isWorld("Cerberus")
          },
          {
            name: "Louisoix",
            filter: isWorld("Louisoix")
          },
          {
            name: "Moogle",
            filter: isWorld("Moogle")
          },
          {
            name: "Omega",
            filter: isWorld("Omega")
          },
          {
            name: "Phantom",
            filter: isWorld("Phantom")
          },
          {
            name: "Ragnarok",
            filter: isWorld("Ragnarok")
          },
          {
            name: "Sagittarius",
            filter: isWorld("Sagittarius")
          },
          {
            name: "Spriggan",
            filter: isWorld("Spriggan")
          }
        ]
      },
      {
        name: "Light",
        filter: isDataCenter("Light"),
        options: [
          {
            name: "Alpha",
            filter: isWorld("Alpha")
          },
          {
            name: "Lich",
            filter: isWorld("Lich")
          },
          {
            name: "Odin",
            filter: isWorld("Odin")
          },
          {
            name: "Phoenix",
            filter: isWorld("Phoenix")
          },
          {
            name: "Raiden",
            filter: isWorld("Raiden")
          },
          {
            name: "Shiva",
            filter: isWorld("Shiva")
          },
          {
            name: "Twintania",
            filter: isWorld("Twintania")
          },
          {
            name: "Zodiark",
            filter: isWorld("Zodiark")
          }
        ]
      }
    ]
  },
  {
    name: "Oceania",
    filter: isRegion("oc"),
    options: [
      {
        name: "Materia",
        filter: isDataCenter("Materia"),
        options: [
          {
            name: "Bismarck",
            filter: isWorld("Bismarck")
          },
          {
            name: "Ravana",
            filter: isWorld("Ravana")
          },
          {
            name: "Sephirot",
            filter: isWorld("Sephirot")
          },
          {
            name: "Sophia",
            filter: isWorld("Sophia")
          },
          {
            name: "Zurvan",
            filter: isWorld("Zurvan")
          }
        ]
      }
    ]
  }
]