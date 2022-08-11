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
            <VenueDirectory listView={this.state.listView} />
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
            <StaffList className="aether-venues__staff-list--collapsible" collapsible={true} />
            <StaffList className="aether-venues__staff-list--not-collapsible" collapsible={false} />
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
