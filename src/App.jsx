// TODO
// Mobile

import React from 'react';
import './App.css';
import './Responsive.css';
import { ModalStage } from "./components/modal-stage/ModalStage";
import days from "./consts/days.json"
import { venueService } from './services/venueService';
import { timeService } from './services/timeService';
import { favouritesService } from './services/favouritesService';
import { VenueStrip } from './components/venue-strip/VenueStrip';
import { VenueOpening } from './components/venue-opening/VenueOpening';
import { isMobile } from "react-device-detect";
import { propFilter, tagFilter, worldFilter } from "./filters/filters";
import { Modal } from "./components/modal/Modal";
import { VenueProfile } from "./components/venue-profile/VenueProfile";
import { HorizontalScroll } from './components/horizontal-scroll/HorizontalScroll';
import { ReactComponent as DiscordIcon } from "./assets/icons/discord-icon.svg";
import { ReactComponent as NewVenue } from "./assets/icons/new-venue-icon.svg";
import { ReactComponent as ListViewIcon } from "./assets/icons/list-view-icon.svg";
import { ReactComponent as CardViewIcon } from "./assets/icons/card-view-icon.svg";
import { ReactComponent as DoteLogo } from "./assets/logos/dote.svg";
import { Notice } from './components/notice/notice';

class App extends React.Component {

  constructor() {
    super();
    this.switchToListView = this.switchToListView.bind(this);
    this.switchToCardView = this.switchToCardView.bind(this);
    this._openVenuesIntervalHandle = null;
    this._destroyFavouritesObserver = null;
    this._worldFilters = [
      { key: Symbol(), label: "Cactuar", filter: worldFilter("Cactuar") },
      { key: Symbol(), label: "Adamantoise", filter: worldFilter("Adamantoise") },
      { key: Symbol(), label: "Gilgamesh", filter: worldFilter("Gilgamesh") },
      { key: Symbol(), label: "Jenova", filter: worldFilter("Jenova") },
      { key: Symbol(), label: "Faerie", filter: worldFilter("Faerie") },
      { key: Symbol(), label: "Siren", filter: worldFilter("Siren") },
      { key: Symbol(), label: "Sargatanas", filter: worldFilter("Sargatanas") },
      { key: Symbol(), label: "Midgardsormr", filter: worldFilter("Midgardsormr") },
    ];
    this._typeFilters = [
      { key: Symbol(), label: "Nightclub", filter: tagFilter("nightclub") },
      { key: Symbol(), label: "Den", filter: tagFilter("den") },
      { key: Symbol(), label: "Cafe", filter: tagFilter("cafe") },
      { key: Symbol(), label: "Tavern", filter: tagFilter("tavern") },
      { key: Symbol(), label: "Inn", filter: tagFilter("inn") },
      { key: Symbol(), label: "Lounge", filter: tagFilter("lounge") },
      { key: Symbol(), label: "Bath house", filter: tagFilter("bath house") },
      { key: Symbol(), label: "Library", filter: tagFilter("library") },
      { key: Symbol(), label: "Casino", filter: tagFilter("casino") },
      { key: Symbol(), label: "Maid cafe / host club", filter: tagFilter("maid cafe", "host club") }
    ];
    this._featureFilters = [
      { key: Symbol(), label: "SFW", filter: propFilter("sfw", true) },
      { key: Symbol(), label: "Gambling", filter: tagFilter("gambling") },
      { key: Symbol(), label: "Artists", filter: tagFilter("artists") },
      { key: Symbol(), label: "Courtesans", filter: tagFilter("courtesans") },
      { key: Symbol(), label: "Dancers", filter: tagFilter("dancers") },
      { key: Symbol(), label: "Bards", filter: tagFilter("bards") },
      { key: Symbol(), label: "Twitch DJ", filter: tagFilter("twitch dj") },
      { key: Symbol(), label: "Tarot reading", filter: tagFilter("tarot") },
      { key: Symbol(), label: "Pillow talk", filter: tagFilter("pillow") },
      { key: Symbol(), label: "Novel services", filter: tagFilter("novel services") },
      { key: Symbol(), label: "VIP", filter: tagFilter("vip") },
      { key: Symbol(), label: "Triple triad", filter: tagFilter("triple triad") },
      { key: Symbol(), label: "IC RP Only", filter: tagFilter("ic rp only") }
    ]
    const requestedVenueId = window.location.hash.substring(1);
    const requestedVenue = venueService.getVenueById(requestedVenueId);
    this.state = {
      search: "",
      requestedVenue: requestedVenue,
      enabledWorldFilter: null,
      enabledTypeFilters: [],
      enabledFeatureFilters: [],
      openVenues: venueService.getOpenVenues(),
      favouriteVenues: venueService.getVenues().filter(v => v.isFavorite()),
      scheduledVenues: venueService.getVenueSchedule(),
      listView: localStorage.getItem("aether-venues-view-setting") === 'list-view'
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

  toggleTypeFilter(symbol) {
    const location = this.state.enabledTypeFilters.indexOf(symbol);
    const newEnabledFilters = [ ...this.state.enabledTypeFilters ];
    if (location === -1)
      newEnabledFilters.push(symbol);
    else 
      newEnabledFilters.splice(location, 1);
    this.setState({ enabledTypeFilters: newEnabledFilters });
  }

  toggleFeatureFilter(symbol) {
    const location = this.state.enabledFeatureFilters.indexOf(symbol);
    const newEnabledFilters = [ ...this.state.enabledFeatureFilters ];
    if (location === -1)
      newEnabledFilters.push(symbol);
    else 
      newEnabledFilters.splice(location, 1);
    this.setState({ enabledFeatureFilters: newEnabledFilters });
  }

  runFilters(venues) {
    let currentVenues = venues;
    if (this.state.search) {
      currentVenues = currentVenues.filter(v => (v.name || v.venue.name).toLowerCase().indexOf(this.state.search) !== -1);
    }
    if (this.state.enabledWorldFilter !== null) {
      currentVenues = this._worldFilters.find(f => f.key === this.state.enabledWorldFilter).filter(currentVenues);
    }
    for (let filter of this.state.enabledTypeFilters) {
      currentVenues = this._typeFilters.find(f => f.key === filter).filter(currentVenues);
    }
    for (let filter of this.state.enabledFeatureFilters) {
      currentVenues = this._featureFilters.find(f => f.key === filter).filter(currentVenues);
    }
    return currentVenues;
  }

  _renderFavoriteVenues() {
    const venues = this.runFilters(this.state.favouriteVenues);
    if (venues.length === 0)
      return <React.Fragment></React.Fragment>

    
    
    return (
      <div className="aether-venues__venues aether-venues__favourite-venues">
        <details open>
          <summary><h2>Favorites</h2></summary>
          { this.state.listView ? 
            venues.map((v) => <VenueOpening venue={v.venue || v} time={v.time} key={(v.venue || v).id} /> ) :
            <VenueStrip venues={venues} />
          }
        </details>
      </div>);
  }

  _renderOpenVenues() {
    const venues = this.runFilters(this.state.openVenues);
    if (venues.length === 0)
      return <React.Fragment />

    return <div className="aether-venues__venues aether-venues__opennow">
        <details open>
          <summary><h2>Open now</h2></summary>
          { this.state.listView ? 
            venues.map((v) => <VenueOpening venue={v.venue || v} time={v.time} key={(v.venue || v).id} /> ) :
            <VenueStrip venues={venues} />
          }
        </details>
      </div>;
  }

  _renderScheduledVenues() {
    const render = [];
    const currentDay = timeService.getLocalDay();

    for (let i = currentDay, looped = false; !looped || i !== currentDay; (looped = true) && (i = ++i % 7)) {
      const venues = this.runFilters(this.state.scheduledVenues.scheduled[i]);
      if (venues.length === 0)
        continue;
      render.push(
        <div className="aether-venues__day" key={i}>
          <details open>
            <summary><h2>{currentDay === i ? "Today" : currentDay === i - 1 ? "Tomorrow" : days[i]}</h2></summary>
            { this.state.listView ? 
              venues.map((v) => <VenueOpening venue={v.venue || v} time={v.time} key={(v.venue || v).id} /> ) :
              <VenueStrip venues={venues} />
            }
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
    const venues = this.runFilters(this.state.scheduledVenues.unscheduled);
    if (venues.length === 0) {
      return <React.Fragment></React.Fragment>
    }

    return (
      <div className="aether-venues__venues aether-venues__unscheduled-venues">
        <details open>
          <summary><h2>Unscheduled</h2></summary>
          { this.state.listView ? 
              venues.map((v) => <VenueOpening venue={v.venue || v} time={v.time} key={(v.venue || v).id} /> ) :
            <VenueStrip venues={venues} />
          }
        </details>
      </div>);
  }

  _renderNewestVenues() {
    let venues = venueService.getVenues().filter(v => v.isNew());
    venues = this.runFilters(venues);
    if (venues.length === 0)
      return <React.Fragment></React.Fragment>

    venues = venues.sort((a, b) => ((b.added && new Date(b.added)) || 0) - ((a.added && new Date(a.added)) || 0))

    return (
      <div className="aether-venues__venues aether-venues__new-venues">
        <details open={!this.state.listView}>
          <summary><h2>Newest</h2></summary>
          { this.state.listView ? 
              venues.map((v) => <VenueOpening venue={v.venue || v} time={v.time} key={(v.venue || v).id} /> ) :
            <VenueStrip venues={venues} />
          }
        </details>
      </div>)
  }

  _renderFilters() {
    return (
      <React.Fragment>
        <div className="aether-venues__search">
          <input autoFocus={!isMobile} className="aether-venues__search-textbox" type="textbox" placeholder='Search venues' onChange={e => this.setState({ search: e.target.value.toLowerCase() })} />
        </div>
        <div className="aether-venues__tags">
          <HorizontalScroll reverseScroll>
            { this._worldFilters.map(f => 
              <button key={f.label} className={"aether-venues__tag" + (this.state.enabledWorldFilter === f.key ? " aether-venues__tag--enabled" : "")}
                  onClick={() => this.state.enabledWorldFilter === f.key ? this.setState({ enabledWorldFilter: null }) : this.setState({ enabledWorldFilter: f.key })}>
                {f.label}
              </button>
            )}
          </HorizontalScroll>
        </div>
        <div className="aether-venues__tags">
          <HorizontalScroll reverseScroll>
          { this._typeFilters.map(f => 
            <button key={f.label} className={"aether-venues__tag" + (this.state.enabledTypeFilters.indexOf(f.key) !== -1 ? " aether-venues__tag--enabled" : "")}
                onClick={() => this.toggleTypeFilter(f.key)}>
              {f.label}
            </button>
          )}
          </HorizontalScroll>
        </div>
        <div className="aether-venues__tags">
          <HorizontalScroll reverseScroll>
            { this._featureFilters.map(f => 
              <button key={f.label} className={"aether-venues__tag" + (this.state.enabledFeatureFilters.indexOf(f.key) !== -1 ? " aether-venues__tag--enabled" : "")}
                  onClick={() => this.toggleFeatureFilter(f.key)}>
                {f.label}
              </button>
            )}
          </HorizontalScroll>
        </div>
      </React.Fragment>)
  }
  
  switchToListView() {
    localStorage.setItem("aether-venues-view-setting", "list-view");
    this.setState({ listView: true })
  }
  
  switchToCardView() {
    localStorage.setItem("aether-venues-view-setting", "card-view");
    this.setState({ listView: false })
  }

  render() {
    return (
      <React.Fragment>
        <ModalStage />
        <div className="aether-venues">
          <div className="aether-venues__heading">
            <h1><img src="full-logo.png" alt="FFXIV Venues" /></h1>
            <Notice />
            <div className="aether-venues__view-toggle">
              <button onClick={this.switchToListView} className={this.state.listView ? `active` : undefined}><ListViewIcon /> List view</button>
              <button onClick={this.switchToCardView} className={this.state.listView ? undefined : `active`}><CardViewIcon /> Card view</button>
            </div>
            <div className="aether-venues__colaborators">
              In collaboration with
              <a href="https://dotemag.carrd.co/" target="_blank" rel="noreferrer"><DoteLogo style={{height: "30px"}} /></a>
              and 
              <a href="https://aetherentertainer.carrd.co/" target="_blank" rel="noreferrer"><img src="aether-entertainer.png" alt="Aether Entertainer Gazette" /></a>
            </div>
          </div>
          <div className={`aether-venues__list ${ this.state.listView ? `aether-venues__list--list-view` : `aether-venues__list--card-view` }`}>
            { this._renderFilters() }
            { this._renderFavoriteVenues() }
            { !this.state.listView && this._renderOpenVenues() }
            { this._renderNewestVenues() }
            { this._renderScheduledVenues() }
            { this._renderUnscheduledVenues() } 
            <span className="aether-venues__made-by">Made with ❤️ by Kana Ki.</span>
          </div>
          <div className="aether-venues__meta-panel">
            <div className="aether-venues__discord-panels">
              <div className="aether-venues__discord">
                <div className="aether-venues__discord-cta"><NewVenue /> Looking to add your venue to the index?</div>
                <a className="aether-venues__discord-button" target="_blank" rel="noreferrer" href="https://form.jotform.com/220493425516050">Complete the form!</a>
              </div>
              <div className="aether-venues__discord">
                <div className="aether-venues__discord-cta"><DiscordIcon /> Looking for the home of FFXIV Venues?</div>
                <a className="aether-venues__discord-button" target="_blank" rel="noreferrer" href="https://discord.gg/gTP65VYcMj">Join the discord!</a>
              </div>
            </div>
            <div className="aether-venues__individuals">
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/5370f299860d4771c8454e6dd5057ddc_b937560c841465f7c4bc8eb47ea7948afc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh.</div>
                  <div className="aether-venues__made-by-position">Developer, Venue Indexer (Aether)</div>
                </div>
              </div>
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/6adbef94cc3fa361f6a047330a0b9a44_ce736afe35e2ded4e46c4fd0659aef7efc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/252142384303833088">Sumi Satsuo</a>, Jenova.</div>
                  <div className="aether-venues__made-by-position">Venue Indexer (Aether)</div>
                </div>
              </div>
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/d6583919ef6756c46ee9cac82110041a_58a84e851e55175d22158ca97af58a1ffc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://ada.xumm.ffxivphotography.com/">Here Xumm</a>, Siren.</div>
                  <div className="aether-venues__made-by-position">Venue Photographer</div>
                </div>
              </div>
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/adb90390ac9bdd5a39a042dd5676c8c9_ce736afe35e2ded4e46c4fd0659aef7efc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/99616043571380224">Uchu Jupiter</a>, Jenova.</div>
                  <div className="aether-venues__made-by-position">Community Administrator</div>
                </div>
              </div>
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/8eb07e14239fb47e9535cf6f0bfdc9ba_96ab1df8877c1f8ba6a89a39cccfd437fc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/880594476295389205">Lanna'baker Kha</a>, Cactuar.</div>
                  <div className="aether-venues__made-by-position">Community Administrator</div>
                </div>
              </div>
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/639157419cc474330657cc764b33c9ea_1f5fd239b885860b7c2bfc72ad1d97effc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/227307380616986634">Axelle Lenoir</a>, Adamantoise.</div>
                  <div className="aether-venues__made-by-position">Community Administrator</div>
                </div>
              </div>
              <div className="aether-venues__made-by-individual">
                <img src="https://img2.finalfantasyxiv.com/f/325546268785ccad39ac94c00b0e044a_ce736afe35e2ded4e46c4fd0659aef7efc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/870413151676551178">Kaeda Destrian</a>, Jenova.</div>
                  <div className="aether-venues__made-by-position">Community Engagement</div>
                </div>
              </div>
            </div>
          </div>
          { this.state.requestedVenue && 
              <Modal className="venue-modal" onStageClick={_ => this.setState({ requestedVenue: null })}>
                  <button className="venue-modal__close-button" onClick={_ => this.setState({ requestedVenue: null })}><img src="assets/cross.svg" alt="" /></button>
                  <VenueProfile venue={this.state.requestedVenue} />
              </Modal>
          }
        </div>
      </React.Fragment>
    );
  }

}

export { App };
