/**
 * test for userService.getRandomName
 */
const assert = require("power-assert")

const {getRandomName} = require("../../../lib/service/user")

describe('userService.getRandomName', () => {
    it("名前を取得可能", async () => {
        let result
        try {
            result = await getRandomName()
        } catch (e) {
            throw e
        }

        assert.ok(result)
    })
})