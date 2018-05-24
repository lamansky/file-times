'use strict'

const mapObj = require('map-obj')
const moment = require('moment')
const {utimes} = require('@ronomon/utimes')

module.exports = (path, times) => new Promise((resolve, reject) => {
  const {created, modified, accessed} = mapObj(times, (k, v) => [k, +moment(v)])
  utimes(path, created, modified, accessed, error => error ? reject(error) : resolve())
})
