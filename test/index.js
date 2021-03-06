/**
 * テスト用ユーティリティー
 */

let setupCompleted = false
const app = require('../lib/index')
const logger = require('../lib/log/logger').console

const axios = require('axios')
const testApiClient = axios.create({
    baseURL: 'http://localhost:4200',
    responseType: 'json'
})

/**
 * テスト用サーバのセットアップ
 */
function setup() {
    logger.log(`test setting up. ${setupCompleted}`)
    if (setupCompleted) {
        // setupが完了している場合はスキップ
        logger.debug("test/index.js setting up has already been completed. skip setting up.")
        return
    }

    logger.log("[test.index] setting up graphql server for test.")
    app.startServer()

    setupCompleted = true;
    return
}

/**
 * 
 */
function teardown() {
    // app.closeServer();
}

module.exports = {
    setup,
    teardown,
    testApiClient
}