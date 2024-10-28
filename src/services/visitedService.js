class VisitedService {

    constructor() {
        this._visitedCache = [];
    }

    getVisited() {
        if (!this._visitedCache) {
            let data = localStorage.getItem("aether-venues-visited");
            this._visitedCache = data ? JSON.parse(data) : [];
        }
        return this._visitedCache;
    }

    isVisited(id) {
        return this.getVisited().indexOf(id) !== -1;
    }

    setVisited(id) {
        const favourites = this.getVisited();
        favourites.push(id);
        localStorage.setItem("aether-venues-visited", JSON.stringify(favourites));
        return favourites;
    }

    removeVisited(id) {
        const favourites = this.getVisited().filter(i => i !== id);
        localStorage.setItem("aether-venues-visited", JSON.stringify(favourites));
        return favourites;
    }

}

const visitedService = new VisitedService();

export { visitedService }