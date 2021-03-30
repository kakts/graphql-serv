/**
 * express server 起動テスト
 */
const {setup, teardown, testApiClient} = require('./index')
const assert = require('power-assert')

describe('express server 起動テスト', () => {
    before(() => {
        setup()
    })

    after((done) => {
        teardown()
        done()
    })

    it("server起動しヘルスチェックapiに疎通できる。", async () => {
        testApiClient
            .get('/hz')
            .then((response) => {
                assert.equal(response.status, 200)
                assert.equal(response.data, {status: 'ok'})
            })
    })
})