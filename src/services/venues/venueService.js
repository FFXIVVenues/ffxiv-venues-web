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
                     .sort((one, another) => {
                        var oneOverride = one.override && new Date(one.override.start);
                        var anotherOverride = another.override && new Date(another.override.start);
                         return ((another.opening ? another.opening.day * 24 : (anotherOverride.getUTCDay() - 1 < 0 ? 6 : anotherOverride.getUTCDay() - 1) * 24) + (another.opening ? another.opening.start.utc.nextDay ? 24 : 0 : 0) + (another.opening ? another.opening.start.utc.hour : anotherOverride.getUTCHours()) + (another.override ? anotherOverride.getUTCMinutes() / 60 : 0)) 
                         - ((one.opening ? one.opening.day * 24 : (oneOverride.getUTCDay() - 1 < 0 ? 6 : oneOverride.getUTCDay() - 1) * 24) + (one.opening ? one.opening.start.utc.nextDay ? 24 : 0 : 0) + (one.opening ? one.opening.start.utc.hour : oneOverride.getUTCHours()) + (one.override ? oneOverride.getUTCMinutes() / 60 : 0))
                     });
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
            let aStartTime = (a.opening.start.utc.hour * 100) + a.opening.start.utc.minute;
            if (a.opening.start.utc.nextDay) aStartTime += 2400;
            let bStartTime = (b.opening.start.utc.hour * 100) + b.opening.start.utc.minute;
            if (b.opening.start.utc.nextDay) bStartTime += 2400;
            return aStartTime - bStartTime;
        }));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };