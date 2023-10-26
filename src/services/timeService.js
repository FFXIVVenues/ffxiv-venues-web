class TimeService {

    constructor() {
        this._currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this._offsetCache = [];
    }

    getLocalDay() {
        const day = new Date().getDay() - 1;
        return day < 0 ? day + 7 : day;
    }

    _getTimeZoneOffset(timeZone = 'UTC') {
        const cache = this._offsetCache[timeZone];
        if (cache)
            return cache;
        const date = new Date();
        const srcDate = new Date(date.toLocaleString('en-US', { timeZone }));
        const localDate = new Date(date.toLocaleString('en-US'));
        return this._offsetCache[timeZone] = (localDate.getTime() - srcDate.getTime()) / 6e4;
    }

    convertToLocalOpening(opening) {
        const timezoneOffset = this._getTimeZoneOffset(opening.start.timeZone);

        // if (opening.utc) opening = opening.utc;
        let localOpening = {
            ...opening,
            start: { ...opening.start, timeZone: this._currentTimeZone },
            end: opening.end ? { ...opening.end, timeZone: this._currentTimeZone } : null
        }

        // Adjust the start time
        localOpening.start.minute += timezoneOffset;
        localOpening.start.hour += Math.floor(localOpening.start.minute / 60);
        localOpening.start.minute = Math.abs(localOpening.start.minute % 60);

        // Check if start time moves to the next day
        if (localOpening.start.hour >= 24 && !localOpening.start.nextDay) {
            localOpening.start.hour %= 24;
            localOpening.day = (localOpening.day + 1) % 7;
        } else if (localOpening.start.hour < 0 && localOpening.start.nextDay) {
            localOpening.start.hour = 24 + (localOpening.start.hour % 24);
            localOpening.start.nextDay = false;
        } else if (localOpening.start.hour >= 24 && localOpening.start.nextDay) {
            localOpening.start.hour %= 24;
            localOpening.day = (localOpening.day + 2) % 7;
            localOpening.start.nextDay = false;
        } else if (localOpening.start.hour < 0 && !localOpening.start.nextDay) {
            localOpening.start.hour = 24 + (localOpening.start.hour % 24);
            localOpening.day = (localOpening.day + 6) % 7;
        }

        if (!localOpening.end)
            return localOpening;

        // Adjust the end time
        localOpening.end.minute += timezoneOffset;
        localOpening.end.hour += Math.floor(localOpening.end.minute / 60);
        localOpening.end.minute = Math.abs(localOpening.end.minute % 60);

        // Check if end time moves to the next day
        if (localOpening.end.hour >= 24) {
            localOpening.end.hour %= 24;
        } else if (localOpening.end.hour < 0) {
            localOpening.end.hour = 24 + (localOpening.end.hour % 24);
        }

        localOpening.end.nextDay = localOpening.end.hour !== localOpening.start.hour ?
          localOpening.end.hour < localOpening.start.hour :
          localOpening.end.minute < localOpening.start.minute;

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
        return `T${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
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