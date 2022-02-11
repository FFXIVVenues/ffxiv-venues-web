import React from 'react';
import './App.css';
import { VenueOpening } from "./components/venue-opening/VenueOpening";
import { ModalStage } from "./components/modal-stage/ModalStage";
import days from "./consts/days.json"
import { venueService } from './services/venueService';
import { timeService } from './services/timeService';
import { favouritesService } from './services/favouritesService';
import { VenueStrip } from './components/venue-strip/VenueStrip';

class App extends React.Component {

  constructor() {
    super();
    this._venueViewModels = venueService.getVenueTimes();
    this._destroyFavouritesObserver = null;
  }

  componentDidMount() {
    this._destroyFavouritesObserver = favouritesService.observe(this.forceUpdate.bind(this));
  }

  componentWillUnmount() {
    if (this._destroyFavouritesObserver) this._destroyFavouritesObserver();
  }

  _renderFavourites() {
    const favouriteVenues = venueService.getVenues().filter(v => favouritesService.getFavourites().indexOf(v.id) !== -1);
    if (favouriteVenues.length === 0) {
      return <React.Fragment></React.Fragment>
    }
    return (
      <div className="aether-venues__venues aether-venues__favourite-venues">
        <details open>
          <summary><h2>Favorites</h2></summary>
          <VenueStrip venues={favouriteVenues} />
        </details>
      </div>);
  }

  _renderScheduledVenues() {
    const render = [];
    const currentDay = timeService.getLocalDay();

    const openNow = this._venueViewModels.scheduled[currentDay].filter(v => timeService.isOpen(v.time));

    render.push(
      <div className="aether-venues__opennow">
        <details open>
          <summary><h2>Open now</h2></summary>
          <VenueStrip venues={openNow} />
        </details>
      </div>
    );

    for (let i = currentDay, looped = false; !looped || i !== currentDay; (looped = true) && (i = ++i % 7)) {
      const venues = this._venueViewModels.scheduled[i];
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
    if (this._venueViewModels.unscheduled.length === 0) {
      return <React.Fragment></React.Fragment>
    }
    return (
      <div className="aether-venues__venues aether-venues__unscheduled-venues">
        <details open>
          <summary><h2>Unscheduled</h2></summary>
          <VenueStrip venues={this._venueViewModels.unscheduled} />
        </details>
      </div>);
  }

  _renderNewestVenues() {
    const newIfAfter = new Date();
    newIfAfter.setDate(newIfAfter.getDate() - 14);
    let newVenues = venueService.getVenues().filter(v => v.added && new Date(v.added) > newIfAfter);
    newVenues = newVenues.sort((a, b) => (b.added && new Date(b.added) || 0) - (a.added && new Date(a.added) || 0))
    
    return (
      <div className="aether-venues__venues aether-venues__newest-venues">
        <details open>
          <summary><h2>Newest</h2></summary>
          <VenueStrip venues={newVenues} />
        </details>
      </div>);
  }

  render() {
    return (
      <React.Fragment>
        <ModalStage />
        <div className="aether-venues">
          <div className="aether-venues__heading">
            <h1><img src="full-logo.png" alt="FFXIV Venues" /></h1>
          </div>
          { this._renderFavourites() }
          { this._renderNewestVenues() }
          { this._renderScheduledVenues() }
          { this._renderUnscheduledVenues() } 
          <div className="aether-venues__made-by">
            Made with <span>♥</span> by <a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh. <br/>
            Photography by <a target="_blank" rel="noreferrer" href="https://here-xumm.carrd.co/">Here Xumm</a>, Siren.
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export { App };
