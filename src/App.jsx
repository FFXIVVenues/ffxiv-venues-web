import React from 'react';
import './App.css';
import { VenueOpening } from "./components/venue-opening/VenueOpening";
import { ModalStage } from "./components/modal-stage/ModalStage";
import days from "./consts/days.json"
import { venueService } from './services/venueService';
import { timeService } from './services/timeService';
import { favouritesService } from './services/favouritesService';

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
          {favouriteVenues.map((v, i) => <VenueOpening venue={v} key={i} /> )}
        </details>
      </div>);
  }

  _renderScheduledVenues() {
    const render = [];
    const currentDay = timeService.getLocalDay();

    for (let i = currentDay, looped = false; !looped || i !== currentDay; looped = true && (i = ++i % 7)) {
      const venues = this._venueViewModels.scheduled[i];
      render.push(
        <div className="aether-venues__day" key={i}>
          <details open>
            <summary><h2>{days[i]}</h2></summary>
            { venues.map((v, i) => <VenueOpening {...v} key={i} /> )}
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
          { this._venueViewModels.unscheduled.map((v, i) => <VenueOpening venue={v} key={i} /> )}
        </details>
      </div>);
  }

  render() {
    return (
      <React.Fragment>
        <ModalStage />
        <div className="aether-venues">
          <div className="aether-venues__banner-credit">
            Photography by <a target="_blank" rel="noreferrer" href="https://here-xumm.carrd.co/">Here Xumm</a>, Siren.
          </div>
          <div className="aether-venues__heading">
            <img src="logo.png" alt="" />
            <h1>Aether Venues</h1>
          </div>
          <p className="aether-venues__definition">
            A venue is a place maintained by players for all RPers to come by and RP in. This includes taverns, shops, nightclubs, restaurants or even crazier environments like colosseums. They often include various RP "services" such as in-house photography, artists, tarrot readings and courtesans. Venues must have a regularly scheduled opening time to be on this list. 
          </p>  
          { this._renderFavourites() }
          { this._renderScheduledVenues() }
          { this._renderUnscheduledVenues() }
          <div className="aether-venues__made-by">
            Made with <span>♥</span> by <a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh.
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export { App };
