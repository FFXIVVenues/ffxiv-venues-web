class TimeService {

    getLocalTime(time) {
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

    addHours(time, hours) {
        const willBeNextDay = time.hour + hours > 23;
        const newHour = willBeNextDay ? time.hour - (24 - hours) : time.hour + hours;
        const nextDay = time.nextDay || willBeNextDay;
        return {
            ...time,
            hour: newHour,
            nextDay
        }
    }

}

const timeService = new TimeService();

export { timeService };