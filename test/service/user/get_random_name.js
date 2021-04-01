/**
 * test for userService.getRandomName
 */
const assert = require("power-assert")
const nock = require('nock')

const testCore = require('../../index')
const {getRandomName} = require("../../../lib/service/user")

describe('userService.getRandomName', () => {
    const resultName = 'testName'
    before(() => {
        // mock api
        nock('http://names.drycodes.com')
            .get('/1')
            .reply(200, [resultName])
    })

    after(() => {
        testCore.teardown()
    })

    it("名前を取得可能", async () => {
        let result, err
        try {
            result = await getRandomName()
        } catch (e) {
            err = e
        }

        assert.equal(err, null)
        assert.ok(result)
        assert.equal(typeof result, 'string')
        assert.equal(result, resultName)
    })
})