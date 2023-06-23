import { timeService } from "../services/timeService";

class Opening {

    constructor(props) {
        Object.assign(this, props);
        this.ranking = this._getRanking();
        // todo: Data currently contains timeZone ID's that are not IANA, so use UTC
        this.local = timeService.convertToLocalOpening(this.utc);
    }

    _getRanking() {
        let hours = this.utc.day * 24 + this.utc.start.hour;
        let minutes = hours * 60 + this.utc.start.minute;
        return minutes;
    }

}

export { Opening };