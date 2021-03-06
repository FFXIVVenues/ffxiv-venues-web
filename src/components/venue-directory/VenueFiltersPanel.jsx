import { useState } from "react";
import { isMobile } from "react-device-detect";
import { /*propFilter,*/ tagFilter, worldFilter, dataCenterFilter } from "./VenueFilters";
import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll";

// const regionFilters = [
//   { key: Symbol(), label: "North America", filter: regionFilter("NA") },
//   { key: Symbol(), label: "Japan", filter: regionFilter("JP") },
//   { key: Symbol(), label: "Europe", filter: regionFilter("EU") },
//   { key: Symbol(), label: "Oceania", filter: regionFilter("OC") }
// ];
const dataCenterFilters = [
  { key: Symbol(), label: "Aether", filter: dataCenterFilter("Aether") },
  { key: Symbol(), label: "Primal", filter: dataCenterFilter("Primal") },
  { key: Symbol(), label: "Crystal", filter: dataCenterFilter("Crystal") }
  // { key: Symbol(), label: "Elemental", filter: dataCenterFilter("Elemental") },
  // { key: Symbol(), label: "Gaia", filter: dataCenterFilter("Gaia") },
  // { key: Symbol(), label: "Mana", filter: dataCenterFilter("Mana") },
  // { key: Symbol(), label: "Chaos", filter: dataCenterFilter("Chaos") },
  // { key: Symbol(), label: "Light", filter: dataCenterFilter("Light") },
  // { key: Symbol(), label: "Materia", filter: dataCenterFilter("Materia") },
];

const worldFilters = [
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
];

const typeFilters = [
  { key: Symbol(), label: "Nightclub", filter: tagFilter("nightclub") },
  { key: Symbol(), label: "Den", filter: tagFilter("den") },
  { key: Symbol(), label: "Cafe", filter: tagFilter("cafe") },
  { key: Symbol(), label: "Tavern", filter: tagFilter("tavern") },
  { key: Symbol(), label: "Inn", filter: tagFilter("inn") },
  { key: Symbol(), label: "Lounge", filter: tagFilter("lounge") },
  { key: Symbol(), label: "Bath house", filter: tagFilter("bath house") },
  { key: Symbol(), label: "Auction house", filter: tagFilter("auction house") },
  { key: Symbol(), label: "Casino", filter: tagFilter("casino") },
  { key: Symbol(), label: "Maid cafe / host club", filter: tagFilter("maid cafe", "host club") },
  { key: Symbol(), label: "Other", filter: tagFilter("other") }
];

const featureFilters = [
  // { key: Symbol(), label: "SFW", filter: propFilter("sfw", true) },
  { key: Symbol(), label: "Gambling", filter: tagFilter("gambling") },
  { key: Symbol(), label: "Artists", filter: tagFilter("artists") },
  // { key: Symbol(), label: "Courtesans", filter: tagFilter("courtesans") },
  { key: Symbol(), label: "Dancers", filter: tagFilter("dancers") },
  { key: Symbol(), label: "Bards", filter: tagFilter("bards") },
  { key: Symbol(), label: "Twitch DJ", filter: tagFilter("twitch dj") },
  { key: Symbol(), label: "Tarot reading", filter: tagFilter("tarot") },
  { key: Symbol(), label: "Pillow talk", filter: tagFilter("pillow") },
  { key: Symbol(), label: "Unique services", filter: tagFilter("novel services") },
  { key: Symbol(), label: "VIP", filter: tagFilter("vip") },
  { key: Symbol(), label: "Triple triad", filter: tagFilter("triple triad") },
  { key: Symbol(), label: "IC RP Only", filter: tagFilter("ic rp only") }
];

const toggle = (symbol, arr) => {
  const location = arr.indexOf(symbol);
  const newArr = [ ...arr ];
  if (location === -1)
    newArr.push(symbol);
  else 
    newArr.splice(location, 1);
  return newArr;
};

export function VenueFiltersPanel(props) {

  const { onSearch, onDataCenterFilterUpdated, onWorldFilterUpdated, onTypeFilterUpdated, onFeatureFilterUpdated } = props;
  const [ enabledDataCenterFilter, setEnabledDataCenterFilter ] = useState(null);
  const [ enabledWorldFilter, setEnabledWorldFilter ] = useState(null);
  const [ enabledTypeFilters, setEnabledTypeFilters ] = useState([]);
  const [ enabledFeatureFilters, setEnabledFeatureFilters ] = useState([]);

  return <>
    <div className="aether-venues__search">
      <input autoFocus={!isMobile} className="aether-venues__search-textbox" type="textbox" placeholder='Search venues' onChange={e => onSearch(e.target.value) } />
    </div>

    <div className="aether-venues__tags">
      <HorizontalScroll reverseScroll>
      { dataCenterFilters.map(f => 
        //todo: Change these to FFXIV Venues Button component?
        <button key={f.label} className={"aether-venues__tag" + (enabledDataCenterFilter === f.key ? " aether-venues__tag--enabled" : "")}
            onClick={() => {
              const newVal = enabledDataCenterFilter === f.key ? null : f.key;
              setEnabledDataCenterFilter(newVal);
              setEnabledWorldFilter(null);
              if (onDataCenterFilterUpdated) {
                if (newVal == null)
                  onDataCenterFilterUpdated(null);
                else {
                  const filter = dataCenterFilters.find(f => f.key === newVal);
                  onDataCenterFilterUpdated(filter);
                }
              }
              if (newVal !== null && onWorldFilterUpdated) 
                onWorldFilterUpdated(null);             
              }
            }>
          {f.label}
        </button>
      )}
      </HorizontalScroll>
    </div>

    <div className="aether-venues__tags">
      <HorizontalScroll reverseScroll>
      { worldFilters.map(f => 
        //todo: Change these to FFXIV Venues Button component?
        <button key={f.label} className={"aether-venues__tag" + (enabledWorldFilter === f.key ? " aether-venues__tag--enabled" : "")}
            onClick={() => {
              const newVal = enabledWorldFilter === f.key ? null : f.key;
              setEnabledWorldFilter(newVal);
              setEnabledDataCenterFilter(null);
              if (onWorldFilterUpdated !== null) {
                if (newVal == null) {
                  onWorldFilterUpdated(null);
                } else {
                  const filter = worldFilters.find(f => f.key === newVal);
                  onWorldFilterUpdated(filter);
                }
              }
              if (newVal !== null && onDataCenterFilterUpdated) {
                onDataCenterFilterUpdated(null);             
              }
            }
          }>
          {f.label}
        </button>
      )}
      </HorizontalScroll>
    </div>

    <div className="aether-venues__tags">
      <HorizontalScroll reverseScroll>
      { typeFilters.map(f => 
        <button key={f.label} className={"aether-venues__tag" + (enabledTypeFilters.indexOf(f.key) !== -1 ? " aether-venues__tag--enabled" : "")}
            onClick={() => {
              const newVal = toggle(f.key, enabledTypeFilters);
              setEnabledTypeFilters(newVal);
              if (!onTypeFilterUpdated) return;
              const filters = newVal.map(key => typeFilters.find(f => f.key === key));
              onTypeFilterUpdated(filters);
            }}>
            {f.label}
        </button>
      )}
      </HorizontalScroll>
    </div>

    <div className="aether-venues__tags">
        <HorizontalScroll reverseScroll>
        { featureFilters.map(f => 
            <button key={f.label} className={"aether-venues__tag" + (enabledFeatureFilters.indexOf(f.key) !== -1 ? " aether-venues__tag--enabled" : "")}
                onClick={() => { 
                  const newVal = toggle(f.key, enabledFeatureFilters);
                  setEnabledFeatureFilters(newVal); 
                  if (!onFeatureFilterUpdated) return;
                  const filters = newVal.map(key => featureFilters.find(f => f.key === key));
                  onFeatureFilterUpdated(filters); 
                }}>
            {f.label}
            </button>
        )}
        </HorizontalScroll>
    </div>

  </>;
}