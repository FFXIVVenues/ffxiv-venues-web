import React from 'react';
import './App.css';
import './Responsive.css';
import { ModalStage } from "./components/modal-stage/ModalStage";
import { venueService } from './services/venueService';
import { Modal } from "./components/modal/Modal";
import { VenueProfile } from "./components/venue-profile/VenueProfile";
import { Notice } from './components/notice/notice';
import { VenueDirectory } from './components/venue-directory/VenueDirectory';
import { StaffList } from './components/staff-list/StaffList'
import { ReactComponent as DiscordIcon } from "./assets/icons/discord-icon.svg";
import { ReactComponent as NewVenue } from "./assets/icons/new-venue-icon.svg";
import { ReactComponent as ListViewIcon } from "./assets/icons/list-view-icon.svg";
import { ReactComponent as CardViewIcon } from "./assets/icons/card-view-icon.svg";
import { ReactComponent as DoteLogo } from "./assets/logos/dote.svg";
import { NewVenueGuidance } from './components/new-venue-guidance/NewVenueGuidance';
import { Button } from './components/button/Button';

class App extends React.Component {

  constructor() {
    super();
    this.switchToListView = this.switchToListView.bind(this);
    this.switchToCardView = this.switchToCardView.bind(this);
    this.state = {
      requestedVenue: null,
      listView: localStorage.getItem("aether-venues-view-setting") === 'list-view'
    };
  }

  componentDidMount() {
    const requestedVenueId = window.location.hash.substring(1);
    venueService.getVenueById(requestedVenueId).then(v => this.setState({ requestedVenue: v }));
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
          { new Date("2022-12-11T04:30Z") > new Date() && <Notice /> }
          <div className={`aether-venues__list ${ this.state.listView ? `aether-venues__list--list-view` : `aether-venues__list--card-view` }`}>
            <VenueDirectory listView={this.state.listView} />
            <span className="aether-venues__made-by">Made with ❤️ by Kana Ki.</span>
            <span className="aether-venues__patreons">Supported by our Patrons ❤️
              <img src={`https://img2.finalfantasyxiv.com/f/63cdf881f6443d20084d006afdba7b87_745baffc465480ed372e274d50318290fc0_96x96.jpg`} alt=""/> 
              <a target="_blank" rel="noreferrer" href="https://na.finalfantasyxiv.com/lodestone/character/38338653/">Autumn Dream</a> (Excalibur),
              <img src={`https://img2.finalfantasyxiv.com/f/28b7a4b12553495d9217cae3bfa68acb_8106f857613f8fb994b0be37b26ff4bafc0_96x96.jpg`} alt=""/>
              <a target="_blank" rel="noreferrer" href="https://eu.finalfantasyxiv.com/lodestone/character/42596715/">Ophelia Stormslayer</a> (Zalera), and
              <img src={`https://img2.finalfantasyxiv.com/f/5f070152baf12ac5d75ce1d657bb1d86_5c8ecfbc673e1287a9b5e85423fe1657fc0_96x96.jpg`} alt=""/>
              <a target="_blank" rel="noreferrer" href="https://na.finalfantasyxiv.com/lodestone/character/33428822/">Legiana Skywrath</a> (Midgardsormr).
            </span>
          </div>
          <div className="aether-venues__meta-panel">
            <div className="aether-venues__discord-panels">
              <div className="aether-venues__discord">
                <div className="aether-venues__discord-cta"><NewVenue /> Looking to add your venue to the index?</div> 
                <Button className="aether-venues__discord-button" onClick={_ => this.setState({ showNewVenueModal: true })} style={{ width: "100%" }}>Add your venue! 🥰</Button>
              </div>
              <div className="aether-venues__discord">
                <div className="aether-venues__discord-cta"><DiscordIcon /> Looking for the home of FFXIV Venues?</div>
                <Button className="aether-venues__discord-button" href="https://discord.gg/gTP65VYcMj" style={{ width: "100%" }}>Join the discord!</Button>
              </div>
            </div>
            <StaffList className="aether-venues__staff-list--collapsible" collapsible={true} />
            <StaffList className="aether-venues__staff-list--not-collapsible" collapsible={false} />
          </div>
          { this.state.requestedVenue &&
              <Modal className="venue-modal" onStageClick={_ => this.setState({ requestedVenue: null })}>
                <button className="venue-modal__close-button" onClick={_ => this.setState({ requestedVenue: null })}><img src="assets/cross.svg" alt="" /></button>
                <VenueProfile venue={this.state.requestedVenue} />
              </Modal>
          }
          { this.state.showNewVenueModal &&
              <Modal className="new-venue-modal" onStageClick={_ => this.setState({ showNewVenueModal: false })}>
                <button className="venue-modal__close-button" onClick={_ => this.setState({ showNewVenueModal: false })}><img src="assets/cross.svg" alt="" /></button>
                <NewVenueGuidance />
              </Modal>
          }
        </div>
      </React.Fragment>
    );
  }

}

export { App };

