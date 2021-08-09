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

  venueViewModels = venueViewModels.sort((a, b) =>  {
    const dayDiff = a.day - b.day;
    if (dayDiff != 0) {
      return dayDiff;
    }
    let aStartTime = parseInt(a.start);
    if (aStartTime < 600) aStartTime += 2400;
    let bStartTime = parseInt(b.start);
    if (bStartTime < 600) bStartTime += 2400;
    return aStartTime - bStartTime;
  })

  return (
    <div className="aether-venues">
      <div className="aether-venues__heading">
        <img src="logo.png" alt="" />
        <h1>Aether Venues</h1>
      </div>
      <p className="aether-venues__definition">
      A venue is a place maintained by players for all RPers to come by and RP in. This includes taverns, shops, nightclubs, restaurants or even crazier environments like colosseums. They often include various RP "services" such as in-house photography, artists, tarrot readings and courtesans. Venues must have a regularly scheduled open time to be on this list. 
      </p>
      <div className="aether-venues__venues">
        { venueViewModels.map(v => <Venue {...v} /> )}
      </div>
      <div className="aether-venues__made-by">Made with <span>♥</span> by <a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh.</div>
    </div>
  );
}

export default App;
