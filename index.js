function isPublicHoliday() {
    var d = new Date()
    var Holidays = require('date-holidays')
    var hd = new Holidays('AU', 'NSW')
    var thisYear = d.getFullYear()
    var thisYearHoliday = hd.getHolidays(thisYear)
    // console.log(thisYearHoliday)
    thisYearHoliday.forEach(element => {
        if (element.type == 'public') {
            var nowTime = d.getTime()
            startTime = element.start.getTime()
            endTime = element.end.getTime()
            if (startTime <= nowTime && nowTime <= endTime) {
                console.log("It's public holiday - " + element.name)
                return true
            }
        } 
        else {
            var w = d.getDay()
            if ( w == 0 || w == 6) {
                console.log("It's weekends!")
                return true
                } 
                else {
                    return false
                }
        }
    }
)}



isPublicHoliday()