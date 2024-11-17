import "./FilterSet.css";

import React, { useState, useEffect } from 'react';
import LeftArrow from "./left-arrow.svg";
import RightArrow from "./right-arrow.svg";

export function FilterSet(props) {
  const [open, setOpen] = useState(-1);
  const [activeOptions, setActiveOptions] = useState([]);
  const [activeStack, setActiveStack ] = useState(props._activeStack || '0');

  const stackKey = props._stackKey === undefined ? 0 : props._stackKey;
  const noFiltersSelected = !activeOptions.find(a => a) && activeStack === '0';

  const onClear = () => {
    setActiveOptions([]);
    setActiveStack(stackKey);
    if (props.onFilter)
      props.onFilter({
        _stackKey: stackKey,
        selectedOptions: []
      });
  }

  const onActivate = (o, i) => {
    console.time("FilterMenu.onActivate");

    let newActive = [];
    if (!props.singleSelect) {
      newActive = [ ...activeOptions ];
    }
    newActive[i] = activeOptions[i] === undefined ? o : undefined;
    setActiveOptions(newActive);
    const selectedOptions = newActive.filter(f => f !== undefined);
    if (props.onFilter)
      props.onFilter({
        _stackKey: stackKey,
        selectedOptions: selectedOptions
      });
    setActiveStack(selectedOptions.length > 0 ? stackKey : '0');

    console.timeEnd("FilterMenu.onActivate");
  };

  const onChildActivate = (filterData) => {
    setActiveOptions([]);
    setActiveStack(filterData.selectedOptions.length > 0 ? filterData._stackKey : '0');
    if (props.onFilter) props.onFilter(filterData);
  };

  useEffect(() => {
    if (props._activeStack !== stackKey) {
      setActiveOptions([]);
      setActiveStack(props._activeStack || '0')
    }
  }, [ props._activeStack ]);

  return (
    <ul className={`filter-menu ${props.open || stackKey === 0 ? "filter-menu--active" : ""}`}>
      {
        props.heading &&
        <li className="filter-menu__li">
          <div className={noFiltersSelected ? "filter-menu__item-controls filter-menu__item-controls--active" : "filter-menu__item-controls"}>
            <div className="filter-menu__left-icon">{ props.heading.icon && <props.heading.icon alt="" /> }</div>
            <span className="filter-menu__label" onClick={() => onClear()}>{props.heading.name}</span>
            <div className="filter-menu__right-icon"></div>
          </div>
        </li>
      }

      {props.options.map((option, i) => {
        if (open !== -1 && open !== i)
          return null;

        return <li key={option.name} className="filter-menu__li">
          <div className={activeOptions[i] === undefined ? "filter-menu__item-controls" : "filter-menu__item-controls filter-menu__item-controls--active"}>
            <div className="filter-menu__left-icon">{open === i && <LeftArrow alt="Navigate Out Icon" onClick={() => setOpen(-1)}/>}</div>
            <span className="filter-menu__label" onClick={() => onActivate(option, i)}>{option.name}</span>
            <div className="filter-menu__right-icon">{open !== i && option.options && <RightArrow alt="Navigate In Icon" onClick={() => setOpen(i)}/>}</div>
          </div>
          { option.options &&
            <FilterSet
              _stackKey={stackKey + "." + i}
              open={open === i}
              options={option.options}
              onFilter={onChildActivate}
              _activeStack={activeStack}
            />
          }
        </li>
      })}
    </ul>
  );
}
