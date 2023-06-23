import { timeService } from "../services/timeService";

class Time {

    constructor(props) {
        Object.assign(this, props);
        this.twelvehourTime = timeService.convertTo12HourTime(this);
        this.localIsoString = timeService.convertToIsoTime(this);
    }

}

export { Time };