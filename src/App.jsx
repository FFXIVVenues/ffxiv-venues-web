// TODO
// Add all filters
// Sort out padding on cards for text overflow
// Fix over margin between "new" and "open" tags
// Add favorite indicator
// Add visited indicator
// Photo for painted rose
// Add logo for Aether Entertainer
// Revise font for strips headers
// Add view mode switching

import React from 'react';
import './App.css';
import { VenueOpening } from "./components/venue-opening/VenueOpening";
import { ModalStage } from "./components/modal-stage/ModalStage";
import days from "./consts/days.json"
import { venueService } from './services/venueService';
import { timeService } from './services/timeService';
import { favouritesService } from './services/favouritesService';
import { VenueStrip } from './components/venue-strip/VenueStrip';
import { bardsFilter, courtesanFilter, maidCafeFilter, openStageFilter } from "./filters/filters";

class App extends React.Component {

  constructor() {
    super();
    this._openVenuesIntervalHandle = null;
    this._destroyFavouritesObserver = null;
    this._filters = [
      { key: Symbol(), label: "Courtesans", filter: courtesanFilter },
      { key: Symbol(), label: "Maid cafe / host club", filter: maidCafeFilter },
      { key: Symbol(), label: "Open stage", filter: openStageFilter },
      { key: Symbol(), label: "Bards", filter: bardsFilter }
    ];
    this.state = {
      enabledFilters: [],
      openVenues: venueService.getOpenVenues(),
      favouriteVenues: venueService.getVenues().filter(v => v.isFavorite()),
      scheduledVenues: venueService.getVenueSchedule()
    };
  }

  componentDidMount() {
    this._openVenuesIntervalHandle = setInterval(_ => 
      this.setState({ openVenues: venueService.getOpenVenues() })
    , 60000);
    this._destroyFavouritesObserver = favouritesService.observe(_ => 
      this.setState({ favouriteVenues: venueService.getVenues().filter(v => v.isFavorite()) })
    );
  }

  componentWillUnmount() {
    if (this._openVenuesIntervalHandle) clearInterval(this._openVenuesIntervalHandle);
    if (this._destroyFavouritesObserver) this._destroyFavouritesObserver();
  }

  toggleTag(symbol) {
    const location = this.state.enabledFilters.indexOf(symbol);
    const newEnabledFilters = [ ...this.state.enabledFilters ];
    if (location === -1)
      newEnabledFilters.push(symbol);
    else 
      newEnabledFilters.splice(location, 1);
    this.setState({ enabledFilters: newEnabledFilters });
  }

  runFilters(venues) {
    let currentVenues = venues;
    for (let filter of this.state.enabledFilters) {
      currentVenues = this._filters.find(f => f.key === filter).filter(currentVenues);
    }
    return currentVenues;
  }

  _renderFavoriteVenues() {
    if (this.state.favouriteVenues.length === 0) {
      return <React.Fragment></React.Fragment>
    }

    const venues = this.runFilters(this.state.favouriteVenues);
    return (
      <div className="aether-venues__venues aether-venues__favourite-venues">
        <details open>
          <summary><h2>Favorites</h2></summary>
          <VenueStrip venues={venues} />
        </details>
      </div>);
  }

  _renderOpenVenues() {
    if (this.state.openVenues.length === 0)
      return <React.Fragment />

    const venues = this.runFilters(this.state.openVenues);
    return <div className="aether-venues__venues aether-venues__opennow">
        <details open>
          <summary><h2>Open now</h2></summary>
          <VenueStrip venues={venues} />
        </details>
      </div>;
  }

  _renderScheduledVenues() {
    const render = [];
    const currentDay = timeService.getLocalDay();

    for (let i = currentDay, looped = false; !looped || i !== currentDay; (looped = true) && (i = ++i % 7)) {
      const venues = this.runFilters(this.state.scheduledVenues.scheduled[i]);
      render.push(
        <div className="aether-venues__day" key={i}>
          <details open>
            <summary><h2>{currentDay === i ? "Today" : currentDay === i - 1 ? "Tomorrow" : days[i]}</h2></summary>
            <VenueStrip venues={venues} />
          </details>
        </div>
      )
    }

    return (
      <div className="aether-venues__venues aether-venues__scheduled-venues">
        { render }
      </div>
    );
  }

  _renderUnscheduledVenues() {
    if (this.state.scheduledVenues.unscheduled.length === 0) {
      return <React.Fragment></React.Fragment>
    }

    const venues = this.runFilters(this.state.scheduledVenues.unscheduled);
    return (
      <div className="aether-venues__venues aether-venues__unscheduled-venues">
        <details open>
          <summary><h2>Unscheduled</h2></summary>
          <VenueStrip venues={venues} />
        </details>
      </div>);
  }

  _renderNewestVenues() {
    let newVenues = venueService.getVenues().filter(v => v.isNew());
    newVenues = this.runFilters(newVenues);
    newVenues = newVenues.sort((a, b) => (b.added && new Date(b.added) || 0) - (a.added && new Date(a.added) || 0))

    return (
      <div className="aether-venues__venues aether-venues__new-venues">
        <details open>
          <summary><h2>Newest</h2></summary>
          <VenueStrip venues={newVenues} />
        </details>
      </div>)
  }

  _renderTags() {
    let newVenues = venueService.getVenues().filter(v => v.isNew());
    newVenues = newVenues.sort((a, b) => (b.added && new Date(b.added) || 0) - (a.added && new Date(a.added) || 0))

    return (
      <div className="aether-venues__tags">
        { this._filters.map(f => 
          <a className={"aether-venues__tag" + (this.state.enabledFilters.indexOf(f.key) !== -1 ? " aether-venues__tag--enabled" : "")}
               onClick={() => this.toggleTag(f.key)}>
            {f.label}
          </a>
        )}
      </div>)
  }

  render() {
    return (
      <React.Fragment>
        <ModalStage />
        <div className="aether-venues">
          <div className="aether-venues__heading">
            <h1><img src="full-logo.png" alt="FFXIV Venues" /></h1>
          </div>
          <div className="aether-venues__list">
            { this._renderTags() }
            { this._renderFavoriteVenues() }
            { this._renderOpenVenues() }
            { this._renderNewestVenues() }
            { this._renderScheduledVenues() }
            { this._renderUnscheduledVenues() } 
          </div>
          <div className="aether-venues__made-by">
            <div className="aether-venues__made-by-individual">
              <img src="https://img2.finalfantasyxiv.com/f/5370f299860d4771c8454e6dd5057ddc_b937560c841465f7c4bc8eb47ea7948afc0_96x96.jpg" alt=""/>
              <div className="aether-venues__made-by-details">
                <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh.</div>
                <div className="aether-venues__made-by-position">Developer, Venue Indexer for Aether</div>
              </div>
            </div>
            <div className="aether-venues__made-by-individual">
              <img src="https://img2.finalfantasyxiv.com/f/d6583919ef6756c46ee9cac82110041a_58a84e851e55175d22158ca97af58a1ffc0_96x96.jpg" alt=""/>
              <div className="aether-venues__made-by-details">
                <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://ada.xumm.ffxivphotography.com/">Here Xumm</a>, Siren.</div>
                <div className="aether-venues__made-by-position">Venue Photographer</div>
              </div>
            </div>
          </div>  
        </div>
      </React.Fragment>
    );
  }

}

export { App };
