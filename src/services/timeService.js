import { DateTime } from "luxon";
import {Time} from "../model/Time";

const previousDayIfBeforeHour = 12;

class TimeService {

    getLocalDay() {
        const utcDay = new Date().getUTCDay();
        let currentDay = new Date().getUTCHours() < previousDayIfBeforeHour ? utcDay - 2 : utcDay - 1;
        if (currentDay < 0) currentDay += 7;
        return currentDay;
    }

    convertToLocalOpening(opening) {
        const sourceTimeZone = DateTime.local().setZone(opening.start.timeZone);
        const currentTimeZone = DateTime.local();
        const timezoneOffset = currentTimeZone.offset - sourceTimeZone.offset;

        // if (opening.utc) opening = opening.utc;
        let localOpening = {
            ...opening,
            start: { ...opening.start, timeZone: currentTimeZone.zoneName },
            end: opening.end ? { ...opening.end, timeZone: currentTimeZone.zoneName } : null
        }

        // Adjust the start time
        localOpening.start.minute += timezoneOffset;
        localOpening.start.hour += Math.floor(localOpening.start.minute / 60);
        localOpening.start.minute = localOpening.start.minute % 60;

        // Check if start time moves to the next day
        if (localOpening.start.hour >= 24 && !localOpening.start.nextDay) {
            localOpening.start.hour %= 24;
            localOpening.start.nextDay = true;
        } else if (localOpening.start.hour < 0 && localOpening.start.nextDay) {
            localOpening.start.hour = 24 + (localOpening.start.hour % 24);
            localOpening.start.nextDay = false;
        } else if (localOpening.start.hour >= 24 && localOpening.start.nextDay) {
            localOpening.start.hour %= 24;
            localOpening.day = (localOpening.day + 1) % 7;
        } else if (localOpening.start.hour < 0 && !localOpening.start.nextDay) {
            localOpening.start.hour = 24 + (localOpening.start.hour % 24);
            localOpening.day = (localOpening.day + 6) % 7;
        }

        localOpening.start = new Time(localOpening.start);
        if (!localOpening.end)
            return localOpening;

        // Adjust the end time
        localOpening.end.minute += timezoneOffset;
        localOpening.end.hour += Math.floor(localOpening.end.minute / 60);
        localOpening.end.minute = localOpening.end.minute % 60;

        // Check if end time moves to the next day
        if (localOpening.end.hour >= 24) {
            localOpening.end.hour %= 24;
            localOpening.end.nextDay = true;
        } else if (localOpening.end.hour < 0) {
            localOpening.end.hour = 24 + (localOpening.end.hour % 24);
            localOpening.end.nextDay = false;
        }

        localOpening.end = new Time(localOpening.end);
        return localOpening;
    }

    convertTo12HourTime(time) {
        return {
            ...time,
            hour: time.hour > 12 ? time.hour - 12 : time.hour,
            pm: time.hour > 12
        }
    }

    convertToIsoTime(time) {
        return DateTime.fromObject({ hour: time.hour, minute: time.minute }, { zone: time.timeZone }).toISOTime();
    }

    convertToLocalTime(time) {
        if (time.utc) time = time.utc;
        const currentTimezoneOffset = new Date().getTimezoneOffset() / -60;

        const utcHour = time.hour;
        const localMinute = time.minute;
        let nextDay = time.nextDay;
        let localHour = utcHour + currentTimezoneOffset;
        if (localHour < 0) {
            localHour = 24 + localHour;
            nextDay = false;
        }
        if (localHour >= 24) {
            localHour = localHour - 24;
            nextDay = true;
        }
        return {
            utcHour,
            hour: localHour,
            minute: localMinute,
            pm: localHour > 12,
            nextDay
        };
    }

}

const timeService = new TimeService();

export { timeService };