import {Venue} from "../../model/Venue";

const FlagCategory = {
    VenueEmpty: "VenueEmpty",
    IncorrectInformation: "IncorrectInformation",
    InappropriateContent: "InappropriateContent"
};

class FlagService {

    flagVenue(venueId, flagCategory, description) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                venueId: venueId,
                category: flagCategory,
                description: description
            })
        };
        return fetch(import.meta.env.VITE_FFXIV_VENUES_API_ROOT + `/v1.0/venue/${venueId}/flag`, requestOptions);
    }

}

const flagService = new FlagService();

export { flagService, FlagCategory };