class ScheduleOverride {

    constructor(props) {
        Object.assign(this, props);
        this.start = new Date(this.start);
        this.end = new Date(this.end);
    }

}

export { ScheduleOverride };