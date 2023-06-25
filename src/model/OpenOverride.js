class OpenOverride {

    constructor(props) {
        Object.assign(this, props);
        this.start = new Date(this.start);
        this.end = new Date(this.end);
        this.ranking = this._getRanking();
    }

    _getRanking() {
        let days = (this.start.getUTCDay() + 6) % 7; // Our week beginning is Monday
        let hours = days * 24 + this.start.getUTCHours();
        let minutes = hours * 60 + this.start.getUTCMinutes();
        return minutes;
    }

}

export { OpenOverride };