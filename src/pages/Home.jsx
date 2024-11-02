import React from 'react';
import '../App.css';
import '../Responsive.css';
import { ModalStage } from "../components/ModalStage/ModalStage";
import { venueService } from '../services/venueService';
import { Modal } from "../components/ModalStage/Modal";
import { VenueProfile } from "../components/VenueProfile/VenueProfile";
import { VenueDirectoryPage } from './VenueDirectoryPage/VenueDirectoryPage';
import { PersonList } from '../components/PersonList/PersonList';
import { staff} from "../components/PersonList/PeopleLists";
import DiscordIcon from "../assets/icons/discord-icon.svg";
import NewVenue from "../assets/icons/new-venue-icon.svg";
import ListViewIcon from "../assets/icons/list-view-icon.svg";
import CardViewIcon from "../assets/icons/card-view-icon.svg";
import { Notice } from "../components/Notice/Notice";
import { NewVenueGuidance } from '../components/NewVenueGuidance/NewVenueGuidance';
import { Button } from '../components/Button/Button';
import {ModalCloseButton} from "../components/ModalStage/ModalCloseButton";

class Home extends React.Component {

  constructor(props) {
    super(props);
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
        <div className="aether-venues">
          <div className="aether-venues__heading">
            <h1><img src="../../public/full-logo.png" alt="FFXIV Venues" /></h1>
            <div className="aether-venues__view-toggle">
              <button onClick={this.switchToListView} className={this.state.listView ? `active` : undefined}><ListViewIcon /> List view</button>
              <button onClick={this.switchToCardView} className={this.state.listView ? undefined : `active`}><CardViewIcon /> Card view</button>
            </div>
          </div>
          <Notice />
          <div className={`aether-venues__list ${ this.state.listView ? `aether-venues__list--list-view` : `aether-venues__list--card-view` }`}>
            <VenueDirectoryPage listView={this.state.listView} />
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
            <div className="aether-venues__people-lists">
              <PersonList className="aether-venues__staff-list aether-venues__staff-list--collapsible" heading="Meet the staff" people={staff} collapsible={true} />
              <PersonList className="aether-venues__staff-list aether-venues__staff-list--not-collapsible" heading="Meet the staff" people={staff} collapsible={false} />
            </div>
          </div>
          { this.state.requestedVenue &&
              <Modal className="venue-modal" onStageClick={_ => this.setState({ requestedVenue: null })}>
                <ModalCloseButton onClick={_ => this.setState({ requestedVenue: null })} />
                <VenueProfile venue={this.state.requestedVenue} />
              </Modal>
          }
          { this.state.showNewVenueModal &&
              <Modal className="new-venue-modal" onStageClick={_ => this.setState({ showNewVenueModal: false })}>
                <ModalCloseButton onClick={_ => this.setState({ showNewVenueModal: false })} />
                <NewVenueGuidance />
              </Modal>
          }
        </div>
      </React.Fragment>
    );
  }

}

export { Home };

