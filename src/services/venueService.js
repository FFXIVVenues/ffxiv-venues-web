import { timeService } from "./timeService";
import venues from "../venues.json";

class VenueService {
            
    getVenues() {
        return venues.filter(v => {
            if (v.exceptions) {
                const exception = timeService.getActiveException(v.exceptions);
                if (exception != null && exception.hide) return false;
            }
            return true;
        });
    }

    getVenueById() {
        return venues.filter(i => arguments.filter(a => a.id === i).length);
    }

    getVenueTimes() {
        let venueViewModels = { 
            scheduled: [ [], [], [], [], [], [], [] ],
            unscheduled: []
        };
    
        for (const venue of venues) {
            if (venue.exceptions) {
                const exception = timeService.getActiveException(venue.exceptions);
                if (exception != null && exception.hide) continue;
            }
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