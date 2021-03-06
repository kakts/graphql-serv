const log4js = require('log4js')
const config = require('../config/log4js-config')

log4js.configure(config)

const console = log4js.getLogger()
const system = log4js.getLogger("system")

module.exports = {
    console,
    system
}