import venues from "../venues";
import { Venue } from "../model/venue";
import { timeService } from "./timeService";

class VenueService {
    
    constructor() {
        this._venuesCache = null;
    }
    
    getVenues() {
        if (this._venuesCache) 
            return this._venuesCache;
        return this._venuesCache = venues.filter(v => {
            if (v.exceptions) {
                const exception = timeService.getActiveException(v.exceptions);
                if (exception != null && exception.hide) return false;
            }
            return true;
        }).map(v => new Venue(v));
    }

    getVenuesById() {
        return this.getVenues().filter(i => arguments.filter(a => a.id === i).length);
    }

    getOpenVenues() {
        const openVenues = [];
        for (let venue of this.getVenues()) {
            for (let time of venue.times) {
                if (timeService.isOpen(time, venue.exceptions)) {
                    openVenues.push({ venue, time });
                    break;
                }
            }
        }
        return openVenues;
    }

    getVenueSchedule() {
        let venueViewModels = { 
            scheduled: [ [], [], [], [], [], [], [] ],
            unscheduled: []
        };
    
        for (const venue of this.getVenues()) {
            if (venue.times === undefined || venue.times.length === 0) {
                venueViewModels.unscheduled.push(venue);
                continue;
            }
            for (const time of venue.times) {
                const venueViewModel = {
                    venue,
                    time
                };
                venueViewModels.scheduled[time.day].push(venueViewModel);
            }
        }
    
        venueViewModels.scheduled = venueViewModels.scheduled.map(day => day.sort((a, b) => {
            let aStartTime = (a.time.start.hour * 100) + a.time.start.minute;
            if (a.time.start.nextDay) aStartTime += 2400;
            let bStartTime = (b.time.start.hour * 100) + b.time.start.minute;
            if (b.time.start.nextDay) bStartTime += 2400;
            return aStartTime - bStartTime;
        }));

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };