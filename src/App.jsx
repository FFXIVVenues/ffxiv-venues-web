import React from 'react';
import './App.css';
import './Responsive.css';
import { ModalStage } from "./components/modal-stage/ModalStage";
import { venueService } from './services/venueService';
import { Modal } from "./components/modal/Modal";
import { VenueProfile } from "./components/venue-profile/VenueProfile";
import { ReactComponent as DiscordIcon } from "./assets/icons/discord-icon.svg";
import { ReactComponent as NewVenue } from "./assets/icons/new-venue-icon.svg";
import { ReactComponent as ListViewIcon } from "./assets/icons/list-view-icon.svg";
import { ReactComponent as CardViewIcon } from "./assets/icons/card-view-icon.svg";
import { ReactComponent as DoteLogo } from "./assets/logos/dote.svg";
import { Notice } from './components/notice/notice';
import { VenueDirectory } from './components/venue-directory/VenueDirectory';

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
                <img src="https://img2.finalfantasyxiv.com/f/777dba0957855f16eba5fe0b902c0c37_58a84e851e55175d22158ca97af58a1ffc0_96x96.jpg" alt=""/>
                <div className="aether-venues__made-by-details">
                  <div className="aether-venues__made-by-name"><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/158410288238952449">Alitzia Kiryu</a>, Siren.</div>
                  <div className="aether-venues__made-by-position">Community Moderator</div>
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
