import { timeService } from "../services/timeService";

class Schedule {

    constructor(props) {
        Object.assign(this, props);
        this.ranking = this._getRanking();
        this.local = timeService.convertToLocalOpening(this);
        this.nextOpening =  {
            start: new Date(this.nextOpening.start),
            end: new Date(this.nextOpening.end)
        };
    }

    _getRanking() {
        let hours = this.utc.day * 24 + this.utc.start.hour;
        let minutes = hours * 60 + this.utc.start.minute;
        return minutes;
    }

}

export { Schedule };