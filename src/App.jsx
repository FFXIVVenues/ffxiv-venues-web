import './App.css';
import { Venue } from "./components/Venue";
import venues from "./venues.json";

function App() {

  let venueViewModels = [];

  for (const venue of venues) {
    for (const time of venue.times) {
      const {times, ...strippedVenue} = venue;
      venueViewModels.push({ 
        ...strippedVenue,
        day: time.day,
        start: time.start,
        end: time.end 
      });
    }
  }

  venueViewModels = venueViewModels.sort((a, b) => a.day - b.day)

  return (
    <div className="app">
      <h1>Aether Venues</h1>
      <div className="venues">
        { venueViewModels.map(v => <Venue {...v} /> )}
      </div>
      <div className="made-by">Made with <span>♥</span> by <a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh.</div>
    </div>
  );
}

export default App;
