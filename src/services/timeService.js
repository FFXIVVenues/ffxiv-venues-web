const previousDayIfBeforeHour = 12;

class TimeService {

    getLocalDay() {
        const utcDay = new Date().getUTCDay();
        let currentDay = new Date().getUTCHours() < previousDayIfBeforeHour ? utcDay - 2 : utcDay - 1;
        if (currentDay < 0) currentDay += 7;
        return currentDay;
    }

    convertToLocalTime(time) {
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

    isOpen(time, exceptions) {
        if (exceptions !== null && exceptions !== undefined && exceptions.length >= 0) {
            for (let exception of exceptions) {
                let exceptionStart = new Date(exception.start);
                let exceptionEnd = new Date(exception.end);
                let currentDate = new Date();
                if (currentDate >= exceptionStart && currentDate <= exceptionEnd) {
                    return false;
                }
            }
        }

        let currentUtcDay = new Date().getUTCDay() - 1;
        if (currentUtcDay === -1) currentUtcDay = 6;
        const currentUtcHour = new Date().getUTCHours();
        const currentUtcMinute = new Date().getUTCMinutes();

        // Assume venue is open for 2 hours
        const endTime = time.end || timeService.addHours(time.start, 2);

        let startTimeDay = time.start.nextDay ? time.day + 1 : time.day;
        startTimeDay = startTimeDay === 7 ? 0 : startTimeDay;
        const dayAfterVenueStart = (startTimeDay + 1 === 7 ? 0 : startTimeDay + 1);

        const pastOpeningTime = (currentUtcHour === time.start.hour && 
                                currentUtcMinute >= time.start.minute) ||
                                currentUtcHour > time.start.hour;
        const pastOpening = currentUtcDay === dayAfterVenueStart ||
                            (currentUtcDay === startTimeDay && pastOpeningTime);
                            
        let endTimeDay = endTime.nextDay ? time.day + 1 : time.day;
        endTimeDay = endTimeDay === 7 ? 0 : endTimeDay;
        const dayBeforeVenueEnd = (endTimeDay - 1 === -1 ? 6 : endTimeDay - 1);

        const beforeClosingTime = (currentUtcHour === endTime.hour && 
                                    currentUtcMinute < endTime.minute) ||
                                    currentUtcHour < endTime.hour;
        const beforeClosing = currentUtcDay === dayBeforeVenueEnd ||
                              (currentUtcDay === endTimeDay && beforeClosingTime);

        return pastOpening && beforeClosing;
    }

}

const timeService = new TimeService();

export { timeService };