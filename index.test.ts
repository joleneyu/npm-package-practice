import { isPublicHoliday, convertUTCtoSydDate } from "./index"
import timezoneMock from "./node_modules/timezone-mock"

describe("first test", () => {
    test("Should return correct covert local time to AEDT time WITH timezone input", () => {
        const AEDTDate = convertUTCtoSydDate("2021-12-25 00:00:00 GMT-0500")
        expect(AEDTDate).toBe("2021-12-25")
    })
    test("Should return correct covert local time to AEDT time WITHOUT timezone input", () => {
        timezoneMock.register('US/Eastern')
        const result_local = new Date("2021-12-25 12:00:00").toISOString()
        // console.log(result_local)
        const AEDTDate = convertUTCtoSydDate(result_local)
        expect(AEDTDate).toBe("2021-12-26")
    })
    test("Should use local right now time if no date input", () => {
        jest.useFakeTimers().setSystemTime(new Date("2021-12-24 12:00:00 GMT-0500").getTime())
        const localDate = new Date()
        // console.log(localDate)
        const AEDTDate = convertUTCtoSydDate()
        expect(AEDTDate).toBe("2021-12-25")
    })
    test("should return true if the input is Christmas", () => {
        const Christmas = isPublicHoliday("2021-12-25 00:00:00 GMT+1100")
        expect(Christmas).toBe(true)
    })
    test("should return true for The Boxing day", () => {
        jest.useFakeTimers().setSystemTime(new Date("2021-12-26 00:00:00 PST").getTime())
        const localDate = new Date()
        // console.log(localDate)
        const BoxingDay = isPublicHoliday()
        expect(BoxingDay).toBe(true)
    })
})