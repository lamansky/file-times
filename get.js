'use strict'

const fs = require('fs')
const moment = require('moment')
const pfn = require('pfn')

module.exports = (path, {wrapper = moment} = {}) => new Promise((resolve, reject) => {
  wrapper = pfn(wrapper)
  fs.stat(path, (error, stats) => {
    if (error) { reject(error); return }
    resolve([
      ['created', 'birthtime'],
      ['modified', 'mtime'],
      ['changed', 'ctime'],
      ['accessed', 'atime'],
    ].reduce((times, [key, stat]) => {
      const time = stats[stat + 'Ms']
      times[key] = time ? wrapper(time) : null
      return times
    }, {}))
  })
})
