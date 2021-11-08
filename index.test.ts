import { isPublicHoliday, convertUTCtoAEDT } from "./index"
import timezoneMock from "./node_modules/timezone-mock"

describe("first test", () => {
    test("should return true if the input is Christmas", () => {
        const yes = isPublicHoliday("2021-12-25 00:00:00 GMT+1100")
        expect(yes).toBe(true)
    })
    test("Should return correct covert local time to AEDT time WITH timezone input", () => {
        const AEDTDate = convertUTCtoAEDT("2021-12-25 00:00:00 GMT-0500")
        expect(AEDTDate).toBe("2021-12-25")
    })
    test("Should return correct covert local time to AEDT time WITHOUT timezone input", () => {
        timezoneMock.register('US/Eastern')
        const result_local = new Date("2021-12-25 12:00:00").toISOString()
        console.log(result_local)
        const AEDTDate = convertUTCtoAEDT(result_local)
        expect(AEDTDate).toBe("2021-12-26")
    })
})