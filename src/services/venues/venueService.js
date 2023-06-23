import { Venue } from "../../model/Venue";
import offlineVenues from "./venues.json";

class VenueService {
    
    constructor() {
        this._fetchPromise = null;
    }
    
    getVenues() {
        const venuesUrl = process.env.REACT_APP_FFXIV_VENUES_API_ROOT + "/venue";
        AbortSignal.timeout ??= function timeout(ms) {
            const ctrl = new AbortController()
            setTimeout(() => ctrl.abort("timeout"), ms)
            return ctrl.signal
        }

        return this._fetchPromise ??= new Promise((resolve, reject) => {
            fetch(venuesUrl, { signal: AbortSignal.timeout(5000) })
                .then(response => response.json())
                .then(venues => venues.map(v => new Venue(v)))
                .then(resolve)
                .catch(reject)
                .catch(_ => resolve(offlineVenues.map(v => new Venue(v))))
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
                     .map(v => ({ venue: v, opening: v.openings.find(o => o.isNow), override: v.openOverrides.find(o => o.isNow)}))
                     .sort((one, another) =>
                         (another.opening ? another.opening.ranking : another.override.ranking)
                         - (one.opening ? one.opening.ranking : one.override.ranking));
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
    
        venueViewModels.scheduled = venueViewModels.scheduled.map(day =>
          day.sort((a, b) => a.opening.ranking - b.opening.ranking));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };