import days from "../consts/days.json";
import {nth} from "../components/date-string/Nth";

class Schedule {

    constructor(props) {
        Object.assign(this, props);
        this.resolution =  {
            ...this.resolution,
            start: new Date(this.resolution.start),
            end: new Date(this.resolution.end)
        };
    }

    toString() {
        let string = "";
        let day = days[(this.resolution.start.getDay()+6)%7];
        if (this.interval.intervalType === 0) {
            if (this.interval.intervalArgument === 1)
                string += "Weekly on ";
            else if (this.interval.intervalArgument === 2)
                string += "Biweekly on ";
            else {
                string += this.interval.intervalArgument;
                string += " weekly on ";
            }
            string += day;
            string += 's';
        }
        else if (this.interval.intervalType === 1 && this.interval.intervalArgument > 0) {
            string += this.interval.intervalArgument;
            string += nth(this.interval.intervalArgument);
            string += ' ';
            string += day;
            string += " of the month";
        }
        else if (this.interval.intervalType === 1 && this.interval.intervalArgument === -1) {
            string += "Last ";
            string += day;
            string += " of the month";
        }
        else if (this.interval.intervalType === 1 && this.interval.intervalArgument < -1) {
            string += Math.abs(this.interval.intervalArgument);
            string += nth(Math.abs(this.interval.intervalArgument));
            string += " last ";
            string += day;
            string += " of the month";
        }

        return string;
    }

}

export { Schedule };