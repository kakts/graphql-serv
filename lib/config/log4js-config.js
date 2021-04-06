// <APP ROOT>/config/log4js-config.js
const path = require("path");

// ログ出力先のルート
const APP_ROOT = path.join(__dirname, "../../");

// ログ出力設定
// log4jsはルートロガーで使用するので、エクスポートに変更
module.exports = {
  appenders: {
    consoleLog: {
      type: "console"
    },
    // ADD
    systemLog: {
      type: "file",
      filename: path.join(APP_ROOT, "./out/system/system.log"),
      maxLogSize: 5000000, // 5MB
      backups: 5, // 世代管理は5ファイルまで、古いやつgzで圧縮されていく
      compress: true
    }
  },
  categories: {
    default: {
      // appendersで設定した名称を指定する
      // levelは出力対象とするものを設定ここではALL（すべて）
      appenders: ["consoleLog"],
      level: "ALL"
    },
    // ADD
    system: {
      appenders: ["systemLog"],
      level: "ERROR"
    }
  }
};