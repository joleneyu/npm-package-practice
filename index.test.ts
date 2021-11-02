import { isPublicHoliday } from "./index"
describe("first test", () => {
    test("should return true if it Christmas", () => {
        var yes = isPublicHoliday("2021-12-25 00:00:00 GMT+1100")
        expect(yes).toBe(true)
    })
})