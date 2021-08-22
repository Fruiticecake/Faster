const del = require('del')

const killOut = () => del('./out')

exports.killOut = killOut
