/**
 * テスト用ユーティリティー
 */

let setupCompleted = false

/**
 * テスト用サーバのセットアップ
 */
function setup() {
    if (setupCompleted) {
        // setupが完了している場合はスキップ
        console.info("test/index.js setting up has already been completed. skip setting up.")
        return
    }
    
    console.log("[test.index] setting up graphql server for test.")
    require("../lib/index")

    setupCompleted
}

module.exports = {
    setup
}