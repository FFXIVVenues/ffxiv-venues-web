import { useState } from "react";
import { isMobile } from "react-device-detect";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import { regionFilters, dataCenterFilters, worldFilters, typeFilters, featureFilters } from "./venueFilters";
import { motion } from "framer-motion";

import "./VenueFiltersPanel.css";
import {Button} from "../Button/Button";

const toggle = (filter, arr) => {
  const location = arr.indexOf(filter);
  const newArr = [ ...arr ];
  if (location === -1)
    newArr.push(filter);
  else 
    newArr.splice(location, 1);
  return newArr;
};

export function VenueFiltersPanel({ onFilter }) {
  const [ showFilters, setShowFilters ] = useState(false);
  const [ filter, setFilter ] = useState({
      search: null,
      regionFilter: null,
      dataCenterFilter: null,
      worldFilter: null,
      typeFilters: [],
      featureFilters: [],
    });

  const toggleFilters = () => setShowFilters(!showFilters);

  const updateFilter = (newFilter) => {
    let f = {...filter, ...newFilter};
    setFilter(f);
    let filters = [];
    if (f.search && f.search.length > 0) filters.push(v => v.name.toLowerCase().includes(f.search.toLowerCase()));
    if (f.regionFilter) filters.push(f.regionFilter.filter);
    if (f.dataCenterFilter) filters.push(f.dataCenterFilter.filter);
    if (f.worldFilter) filters.push(f.worldFilter.filter);
    f.typeFilters.forEach(tf => filters.push(tf.filter));
    f.featureFilters.forEach(ff => filters.push(ff.filter));
    onFilter(filters);
  }

  const style = { padding: "6px 10.5px 6px 10.5px" }

  return <>
    <div className="venue-filters__search">
      <input autoFocus={!isMobile}
             className="venue-filters__search-textbox"
             type="textbox"
             placeholder='Search venues'
             onChange={e => updateFilter({ search: e.target.value }) } />
      <Button
        className="venue-filters__toggle-button"
        onClick={toggleFilters}
        aria-label={showFilters ? "Hide filters" : "Show filters"}
        style={{ padding: "9px 14px 9px 14px", display: "flex", alignItems: "center", gap: 10 }}
      >
        <span className="venue-filters__toggle-button-text">Filters</span> <span className="venue-filters__toggle-button-arrow">{showFilters ? "▲" : "▼"}</span>
      </Button>
    </div>

    <motion.div 
      className="venue-filters__filters-container"
      animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <div className="venue-filters__region-filter aether-venues__tags">
        <HorizontalScroll reverseScroll>
          { regionFilters.map(renderingFiler =>
              <Button key={renderingFiler.label}
                      style={style}
                      className={"aether-venues__tag" + (filter.regionFilter?.key === renderingFiler.key ? " aether-venues__tag--enabled" : "")}
                      onClick={() => {
                        const newVal = filter.regionFilter?.key === renderingFiler.key ? null : renderingFiler;
                        updateFilter({ regionFilter: newVal, dataCenterFilter: null, worldFilter: null });
                      }}>
                {renderingFiler.label}
              </Button>
          )}
        </HorizontalScroll>
      </div>

      <div className="venue-filters__data-center-filter aether-venues__tags">
        <HorizontalScroll reverseScroll>
          { dataCenterFilters.map(renderingFilter =>
            <Button key={renderingFilter.label}
                    style={style}
                    className={"aether-venues__tag" + (filter.dataCenterFilter?.key === renderingFilter.key ? " aether-venues__tag--enabled" : "")}
                    onClick={() => {
                      const newVal = filter.dataCenterFilter?.key === renderingFilter.key ? null : renderingFilter;
                      updateFilter({ dataCenterFilter: newVal, regionFilter: null, worldFilter: null });
                    }}>
              {renderingFilter.label}
            </Button>
          )}
        </HorizontalScroll>
      </div>

      <div className="venue-filters__world-filter aether-venues__tags">
        <HorizontalScroll reverseScroll>
          { worldFilters.map(renderingFilter =>
            <Button key={renderingFilter.label}
                    style={style}
                    className={"aether-venues__tag" + (filter.worldFilter?.key === renderingFilter.key ? " aether-venues__tag--enabled" : "")}
                    onClick={() => {
                      const newVal = filter.worldFilter?.key === renderingFilter.key ? null : renderingFilter;
                      updateFilter({ worldFilter: newVal, regionFilter: null, dataCenterFilter: null });
                    }}>
              {renderingFilter.label}
            </Button>
          )}
        </HorizontalScroll>
      </div>

      <div className="venue-filters__type-filter aether-venues__tags">
        <HorizontalScroll reverseScroll>
        { typeFilters.map(renderingFilter =>
          <Button key={renderingFilter.label}
                  style={style}
                  className={"aether-venues__tag" + (filter.typeFilters.indexOf(renderingFilter) !== -1 ? " aether-venues__tag--enabled" : "")}
                  onClick={() => {
                    const newVal = toggle(renderingFilter, filter.typeFilters);
                    updateFilter({ typeFilters: newVal });
                  }}>
              {renderingFilter.label}
          </Button>
        )}
        </HorizontalScroll>
      </div>

      <div className="venue-filters__feature-filter aether-venues__tags">
          <HorizontalScroll reverseScroll>
          { featureFilters.map(renderingFilter =>
              <Button
                  key={renderingFilter.label}
                  style={style}
                  className={"aether-venues__tag" + (filter.featureFilters.indexOf(renderingFilter) !== -1 ? " aether-venues__tag--enabled" : "")}
                  onClick={() => {
                    const newVal = toggle(renderingFilter, filter.featureFilters);
                    updateFilter({ featureFilters: newVal });
                  }}>
              {renderingFilter.label}
              </Button>
          )}
          </HorizontalScroll>
      </div>
    </motion.div>

  </>;
}