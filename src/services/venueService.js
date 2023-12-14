import { Venue } from "../model/Venue";

class VenueService {
    
    constructor() {
        this._fetchPromise = null;
    }
    
    getVenues() {
        const venuesUrl = process.env.REACT_APP_FFXIV_VENUES_API_ROOT + "/venue";
        return this._fetchPromise ??= new Promise((resolve, reject) => {
            fetch(venuesUrl)
                .then(response => response.json())
                .then(venues => venues.map(v => new Venue(v)))
                .then(resolve)
                .catch(reject);
        });
    }
    
    async getVenueById(id) {
        const venues = await this.getVenues();
        return venues.find(v => v.id === id);
    }

    async getOpenVenues() {
        const venues = await this.getVenues();
        return venues.filter(v => v.open)
                     .map(v => ({ venue: v, opening: v.schedule.find(o => o.isNow), override: v.scheduleOverrides.find(o => o.isNow)}))
                     .sort((one, another) =>
                         (another.opening ? another.opening.ranking : another.override.ranking)
                         - (one.opening ? one.opening.ranking : one.override.ranking));
    }

    async getVenueSchedule() {
        let venueViewModels = { 
            scheduled: [ [], [], [], [], [], [], [] ],
            future: [],
            unscheduled: []
        };
    
        for (const venue of await this.getVenues()) {
            if (venue.schedule === undefined || venue.schedule.length === 0) {
                venueViewModels.unscheduled.push(venue);
                continue;
            }
            for (const opening of venue.schedule) {
                const venueViewModel = {
                    venue,
                    opening
                };
                if (opening.isWithinWeek === false) {
                    venueViewModels.future.push(venueViewModel);
                    continue;
                }
                venueViewModels.scheduled[opening.local.day].push(venueViewModel);
            }
        }
    
        venueViewModels.scheduled = venueViewModels.scheduled.map(day =>
          day.sort((a, b) => a.opening.ranking - b.opening.ranking));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };