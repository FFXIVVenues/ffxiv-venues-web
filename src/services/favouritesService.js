class FavouritesService {

    constructor() {
        this._observers = [];
    }

    getFavourites() {
        const favourites = localStorage.getItem("aether-venues-favourites");
        if (favourites === null) return [];
        return JSON.parse(favourites);
    }

    isFavourite(id) {
        return this.getFavourites().indexOf(id) !== -1;
    }

    setFavourite(id) {
        const favourites = this.getFavourites();
        favourites.push(id);
        localStorage.setItem("aether-venues-favourites", JSON.stringify(favourites));
        this._observers.forEach(o => o());
        return favourites;
    }

    removeFavourite(id) {
        const favourites = this.getFavourites().filter(i => i !== id);
        localStorage.setItem("aether-venues-favourites", JSON.stringify(favourites));
        this._observers.forEach(o => o());
        return favourites;
    }

    observe(observer) {
        this._observers.push(observer);
        return () => this._observers = this._observers.filter(o => o === observer);
    }

}

const favouritesService = new FavouritesService();

export { favouritesService }