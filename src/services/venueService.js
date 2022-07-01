// import venues from "../venues";
import { Venue } from "../model/Venue";

class VenueService {
    
    constructor() {
        this._fetchPromise = null;
    }
    
    getVenues() {
        if (this._fetchPromise)
            return this._fetchPromise;

        const venuesUrl = process.env.REACT_APP_FFXIV_VENUES_API_ROOT + "/venue";
        return this._fetchPromise = fetch(venuesUrl)
            .then(response => 
                response.json())
            .then(venues => 
                venues.map(v => new Venue(v)));
    }
    
    async getVenueById(id) {
        const venues = await this.getVenues();
        return venues.find(v => v.id === id);
    }

    async getOpenVenues() {
        const venues = await this.getVenues();
        return venues.filter(v => v.open)
                     .map(v => ({ venue: v, opening: v.openings.find(o => o.isNow)}))
                     .sort((one, another) => (one.opening ? one.opening.start.hour : 0) - (another.opening ? another.opening.start.hour : 0));
    }

    async getVenueSchedule() {
        let venueViewModels = { 
            scheduled: [ [], [], [], [], [], [], [] ],
            unscheduled: []
        };
    
        for (const venue of await this.getVenues()) {
            if (venue.openings === undefined || venue.openings.length === 0) {
                venueViewModels.unscheduled.push(venue);
                continue;
            }
            for (const opening of venue.openings) {
                const venueViewModel = {
                    venue,
                    opening
                };
                venueViewModels.scheduled[opening.day].push(venueViewModel);
            }
        }
    
        venueViewModels.scheduled = venueViewModels.scheduled.map(day => day.sort((a, b) => {
            let aStartTime = (a.opening.start.hour * 100) + a.opening.start.minute;
            if (a.opening.start.nextDay) aStartTime += 2400;
            let bStartTime = (b.opening.start.hour * 100) + b.opening.start.minute;
            if (b.opening.start.nextDay) bStartTime += 2400;
            return aStartTime - bStartTime;
        }));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };