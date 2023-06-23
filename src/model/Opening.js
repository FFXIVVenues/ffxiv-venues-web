import { timeService } from "../services/timeService";
import { Time } from "./Time";

class Opening {

    constructor(props) {
        Object.assign(this, props);
        this.start = new Time(this.start);
        this.end = new Time(this.end);
        this.ranking = this._getRanking();
        this.local = timeService.convertToLocalOpening(this.utc);
    }

    _getRanking() {
        let hours = this.utc.day * 24 + this.utc.start.hour;
        let minutes = hours * 60 + this.utc.start.minute;
        return minutes;
    }

}

export { Opening };