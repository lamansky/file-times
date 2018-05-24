'use strict'

const assert = require('assert')
const {get, set} = require('.')
const moment = require('moment')
const tmp = require('tmp')

describe('fileTimes()', function () {
  describe('#get()', function () {
    it('should get the file times of a file path', async function () {
      const now = +moment()
      const times = await get(tmp.fileSync().name)
      for (const timeKey of ['created', 'modified', 'changed', 'accessed']) {
        assert(moment.isMoment(times[timeKey]))
        assert(+times[timeKey] >= now - 100)
      }
    })

    it('should fail if path doesn’t exist', function (done) {
      get('/doesnotexist1234567890').catch(x => done())
    })
  })

  describe('#set()', function () {
    it('should set the file times of a file path', async function () {
      const path = tmp.fileSync().name
      await set(path, {modified: '2018-05-24T09:33:00+0200'})
      const {modified} = await get(path)
      assert(modified.isSame('2018-05-24', 'day'))
    })

    it('should fail if path doesn’t exist', function (done) {
      set('/doesnotexist1234567890', {modified: new Date()}).catch(x => done())
    })
  })
})
