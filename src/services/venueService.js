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

    async getVenueSchedule() {
        let venueViewModels = {
            favourites: [],
            newest: [],
            open: [],
            scheduled: [ [], [], [], [], [], [], [] ],
            future: [],
            unscheduled: []
        };
    
        for (const venue of await this.getVenues()) {
            if (venue.isFavourite())
                venueViewModels.favourites.push({ venue });
            if (venue.isNew())
                venueViewModels.newest.push({ venue });
            if (venue.resolution?.isNow)
                venueViewModels.open.push({ venue });
            if (venue.schedule === undefined || venue.schedule.length === 0) {
                venueViewModels.unscheduled.push({ venue });
                continue;
            }
            for (const opening of venue.schedule) {
                const venueViewModel = { venue, opening };
                if (opening.resolution?.isWithinWeek === false) {
                    venueViewModels.future.push(venueViewModel);
                    continue;
                }
                venueViewModels.scheduled[(opening.resolution.start.getDay()+6)%7].push(venueViewModel);
            }
        }

        venueViewModels.open = venueViewModels.open.sort((one, another) => another.venue.resolution.start - one.venue.resolution.start);
        venueViewModels.scheduled = venueViewModels.scheduled.map(day => day.sort((one, another) => one.opening.resolution.start - another.opening.resolution.start));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };