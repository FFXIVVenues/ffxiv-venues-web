import { favouritesService } from "../services/favouritesService";
import { visitedService } from "../services/visitedService";
import { Location } from "./Location";
import { Opening } from "./Opening";
import { OpenOverride } from "./OpenOverride"

class Venue {

    constructor(props) {
        Object.assign(this, props);
        this.location = new Location(this.location);
        this.openings = this.openings.map(o => new Opening(o));
        this.openOverrides = this.openOverrides.map(o => new OpenOverride(o));
    }

    isFavorite() {
        return favouritesService.getFavourites().indexOf(this.id) !== -1;
    }

    isVisited() {
        return visitedService.getVisited().indexOf(this.id) !== -1;
    }

    isNew() {
        const newIfAfter = new Date();
        newIfAfter.setDate(newIfAfter.getDate() - 14);
        return this.added && new Date(this.added) > newIfAfter
    }

}

export { Venue };