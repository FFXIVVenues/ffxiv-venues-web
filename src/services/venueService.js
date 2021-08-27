import venues from "../venues.json";

class VenueService {
            
    getVenues() {
        return venues;
    }

    getVenuesById() {
        return venues.filter(i => arguments.filter(a => a.id === i).length);
    }

    getVenueTimes() {
        let venueViewModels = { 
            scheduled: [ [], [], [], [], [], [], [] ],
            unscheduled: []
        };
    
        for (const venue of venues) {
            if (venue.times === undefined || venue.times.length === 0) {
                venueViewModels.unscheduled.push(venue);
                continue;
            }
            for (const time of venue.times) {
                const venueViewModel = {
                    venue,
                    time
                };
                // const position = time.day - this._currentDay < 0 ? time.day - this._currentDay + 7 : time.day - this._currentDay;
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