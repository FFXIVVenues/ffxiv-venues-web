import { timeService } from "../services/timeService";

class Schedule {

    constructor(props) {
        Object.assign(this, props);
        this.resolution =  {
            ...this.resolution,
            start: new Date(this.resolution.start),
            end: new Date(this.resolution.end)
        };
    }

}

export { Schedule };