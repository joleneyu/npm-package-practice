import Holidays from 'date-holidays'
import log from 'loglevel'

log.setLevel('debug')
// Input local date and time with timezone information to get the right results.
// Format example "2021-10-03 00:00:00 GMT+0800" - Use this to check if Chinese date 2021-10-03 is a public holiday in NSW, AU.
// Leave input undefined to check if right now is a public holiday in NSW, AU.

export function convertUTCtoSydDate(date?: string) {
    if (date === undefined) {
        const utcDate = new Date()
        log.debug(utcDate.getTimezoneOffset())
        
        if (utcDate.getTimezoneOffset() === -660) {
            // Daylight Savings is in effect
            var SydTime = new Date(utcDate.getTime() + 11*60*60*1000)
            var SydDate = SydTime.toISOString().split('T')[0]
            return SydDate
        }
        else {
            // Daylight Savings is NOT in effect
            var SydTime = new Date(utcDate.getTime() + 10*60*60*1000)
            var SydDate = SydTime.toISOString().split('T')[0]
            return SydDate
        }
    }
    else {
        const utcDate = new Date(date)
        log.debug(utcDate.getTimezoneOffset())
        if (utcDate.getTimezoneOffset() === -660) {
            // Daylight Savings is in effect
            var SydTime = new Date(utcDate.getTime() + 11*60*60*1000)
            var SydDate = SydTime.toISOString().split('T')[0]
            return SydDate
        }
        else {
            // Daylight Savings is NOT in effect
            var SydTime = new Date(utcDate.getTime() + 10*60*60*1000)
            log.debug(SydTime)
            var SydDate = SydTime.toISOString().split('T')[0]
            log.debug(SydDate)
            return SydDate
        }
    }
}

convertUTCtoSydDate("2021-9-25 00:00:00 GMT-0500")

// export function convertUTCtoAEST(date?: string) {
//     if (date === undefined) {
//         var utcDate = new Date()
//         log.debug(utcDate)
//         var AESTime = new Date(utcDate.getTime() + 10*60*60*1000)
//         var AESTDate = AESTime.toISOString().split('T')[0]
//         return AESTDate
//     }
//     else {
//         var utcDate = new Date(date)
//         var AESTime = new Date(utcDate.getTime() + 10*60*60*1000)
//         var AESTDate = AESTime.toISOString().split('T')[0]
//         log.debug(AESTDate)
//         return AESTDate
//     }
// }

export function listDateOfHoliday(date?: string) {
    var thisYear = convertUTCtoSydDate(date).split('-')[0]
    var hd = new Holidays('AU', 'NSW')
    var thisYearHoliday = hd.getHolidays(thisYear)
    var ListOfDate = []
    var hLen = thisYearHoliday.length
    for (let i = 0; i < hLen; i++) {
        if (thisYearHoliday[i].type === 'public') {
            var shortDate = thisYearHoliday[i].date.split(' ')[0]
            ListOfDate.push(shortDate)
        }
    }
    log.debug(ListOfDate)
    return ListOfDate
}

export function isPublicHoliday(date?: string) {
    var AEDTDate = convertUTCtoSydDate(date)
    log.debug(AEDTDate)
    var ShortList = listDateOfHoliday(date)
    if (ShortList.includes(AEDTDate)) {
        log.debug("It is public holiday in NSW, AU")
        return true
    } else {
        log.debug("It's NOT public holiday in NSW, AU")
        return false
    }
}
// Test only!
// isPublicHoliday("2021-12-31 21:01:00 GMT+1100")

// isPublicHoliday("2021-12-25 00:00:00 GMT+1100")
// export function isPublicHoliday(date: string) {
//     if (date === undefined) {
//         var d = new Date()
//         log.debug(d)
//     }
//     else {
//         var d = new Date(date)
//         log.debug(d)
//     }
//     var hd = new Holidays('AU', 'NSW')
//     var thisYear = d.getFullYear()
//     var thisYearHoliday = hd.getHolidays(thisYear)
//     log.debug(thisYearHoliday)
//     thisYearHoliday.forEach(element => {
//         if (element.type == 'public') {
//             var nowTime = d.getTime()
//             var startTime = element.start.getTime()
//             var endTime = element.end.getTime()
//             if (startTime <= nowTime && nowTime <= endTime) {
//                 log.info("It's public holiday - " + element.name)
//                 return true
//             }
//         } 
//         else {
//             var w = d.getDay()
//             if ( w == 0 || w == 6) {
//                 log.info("It's weekends!")
//                 return true
//                 } 
//                 else {
//                     log.info("It's working day!")
//                     log.info(element)
//                     return false
//                 }
//         }
//     }
// )}



