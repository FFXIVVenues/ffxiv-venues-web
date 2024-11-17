import "./DirectoryMenu.css";

import React, {useRef, useState} from "react";
import {FilterSet} from "../../../components/FilterSet/FilterSet";
import {TextBox} from "../../../components/TextBox/TextBox";
import {worldFilters} from "./filters/worldFilters";
import GlobeIcon from "../../../assets/icons/globe-icon.svg";
import SceneIcon from "../../../assets/icons/scene-icon.svg";
import PartierIcon from "../../../assets/icons/partier-icon.svg";
import SearchIcon from "../../../assets/icons/search-icon.svg";
import {categoryFilters} from "./filters/categoryFilters";
import {featureFilters} from "./filters/featureFilters";

export const DirectoryMenu = ({ onFilter }) => {

  const filterRef = useRef({
    search: null,
    locationFilters: [],
    categoryFilters: [],
    featureFilters: []
  });

  const updateFilters = (update) => {
    console.time("FiltersPanel.updateFilters");
    filterRef.current = { ... filterRef.current, ...update };
    let filters = [];
    if (filterRef.current.search && filterRef.current.search.length > 0)
      filters.push(v => v.name.toLowerCase().includes(filterRef.current.search.toLowerCase()));
    filterRef.current.locationFilters.forEach(lf => filters.push(lf));
    filterRef.current.categoryFilters.forEach(cf => filters.push(cf));
    filterRef.current.featureFilters.forEach(ff => filters.push(ff));
    console.timeEnd("FiltersPanel.updateFilters");
    onFilter(filters);
  }

  return (
    <div className="filters-panel__container">
      <div className="filters-panel__search-container">
        <TextBox className="filters-panel__search" Icon={SearchIcon} label="Search venues" onChange={e => updateFilters({ search: e.target.value })} />
      </div>

      <FilterSet
        heading={{
          icon: GlobeIcon,
          name: "All regions"
        }}
        singleSelect
        options={worldFilters}
        onFilter={e => updateFilters({ locationFilters: e.selectedOptions.map(o => o.filter) })} />

      <FilterSet
        heading={{
          icon: SceneIcon,
          name: "All scenes",
        }}
        options={categoryFilters}
        onFilter={e => updateFilters({ categoryFilters: e.selectedOptions.map(o => o.filter) })} />

      <FilterSet
        heading={{
          icon: PartierIcon,
          name: "All features",
        }}
        options={featureFilters}
        onFilter={e => updateFilters({ featureFilters: e.selectedOptions.map(o => o.filter) })} />

    </div>
  )
}