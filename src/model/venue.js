import { favouritesService } from "../services/favouritesService";
import { visitedService } from "../services/visitedService";

class Venue {

    constructor(props) {
        Object.assign(this, props);
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