import { Venue } from "../../model/Venue";
import { request } from "../utils/request";

class VenueService {
    
    constructor() {
        this._fetchPromise = null;
    }
    
    getVenues() {
        const venuesUrl = import.meta.env.VITE_FFXIV_VENUES_API_ROOT + "/v1.0/venue";
        return this._fetchPromise ??= new Promise((resolve, reject) => {
            request(venuesUrl)
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

    async getVenueSchedule(filters) {

        let venueViewModels = {
            favourites: [],
            newest: [],
            open: [],
            scheduled: [ [], [], [], [], [], [], [] ],
            future: [],
            unscheduled: []
        };
        let now = new Date();
        let today = now.getDay();
        let endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + 7);
        endOfWeek.setHours(0, 0, 0, 0);
    
        for (const venue of await this.getVenues()) {
            if (filters && filters.length > 0 && !filters.every(filter => filter(venue))) {
                continue;
            }

            if (venue.isFavourite())
                venueViewModels.favourites.push({ venue });
            if (venue.isNew())
                venueViewModels.newest.push({ venue });
            if (venue.resolution?.isNow)
                venueViewModels.open.push({ venue });

            if (!(venue.schedule?.length || venue.scheduleOverrides?.filter(o => o.end > now).length)) {
                venueViewModels.unscheduled.push({ venue });
                continue;
            }
            for (const opening of venue.schedule) {
                const venueViewModel = { venue, opening: opening.resolution };
                if (opening.resolution?.isWithinWeek === false) {
                    venueViewModels.future.push(venueViewModel);
                    continue;
                }
                let venueDay = opening.resolution.start.getDay();
                let relativeDay = (venueDay - today + 7) % 7;
                venueViewModels.scheduled[relativeDay].push(venueViewModel);
            }
            for (const override of venue.scheduleOverrides) {
                if (!override.open)
                    continue;

                if (override.end < now)
                    continue;

                if (override.start >= endOfWeek)
                    continue;

                const venueViewModel = { id: `${venue.id}_${override.start.toISOString()}`, venue, opening: override };
                let venueDay = override.start.getDay();
                let relativeDay = (venueDay - today + 7) % 7;
                venueViewModels.scheduled[relativeDay].push(venueViewModel);
            }
        }

        venueViewModels.open = venueViewModels.open.sort((one, another) => another.venue.resolution.start - one.venue.resolution.start);
        venueViewModels.scheduled = venueViewModels.scheduled.map(day => day.sort((one, another) =>
           one.opening.start.getHours() - another.opening.start.getHours()
        || one.opening.start.getMinutes() - another.opening.start.getMinutes()));
        venueViewModels.newest = venueViewModels.newest.sort((a, b) => ((b.added && new Date(b.added)) || 0) - ((a.added && new Date(a.added)) || 0));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };