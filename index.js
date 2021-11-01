import Holidays from 'date-holidays'
import log from 'loglevel'

log.setLevel('warn')
// Input local date and time with timezone information to get the right results.
// Format example "2021-10-03 00:00:00 GMT+1100" - Use this to check if Sydney time 2021-10-03 is a public holiday.
// Leave input undefined to check if right now is a public holiday.

export function isPublicHoliday(date) {
    if (date === undefined) {
        var d = new Date()
        log.debug(d)
    }
    else {
        var d = new Date(date)
        log.debug(d)
    }
    var hd = new Holidays('AU', 'NSW')
    var thisYear = d.getFullYear()
    var thisYearHoliday = hd.getHolidays(thisYear)
    log.debug(thisYearHoliday)
    thisYearHoliday.forEach(element => {
        if (element.type == 'public') {
            var nowTime = d.getTime()
            var startTime = element.start.getTime()
            var endTime = element.end.getTime()
            if (startTime <= nowTime && nowTime <= endTime) {
                log.info("It's public holiday - " + element.name)
                return true
            }
        } 
        else {
            var w = d.getDay()
            if ( w == 0 || w == 6) {
                log.info("It's weekends!")
                return true
                } 
                else {
                    log.info("It's working day!")
                    log.info(element)
                    return false
                }
        }
    }
)}


isPublicHoliday("2021-10-04 00:00:00 GMT+1100")