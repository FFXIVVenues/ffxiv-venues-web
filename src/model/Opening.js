import { timeService } from "../services/timeService";

class Opening {

    constructor(props) {
        Object.assign(this, props);
        this.ranking = this._getRanking();
        this.local = timeService.convertToLocalOpening(this);
    }

    _getRanking() {
        let hours = this.utc.day * 24 + this.utc.start.hour;
        let minutes = hours * 60 + this.utc.start.minute;
        return minutes;
    }

}

export { Opening };