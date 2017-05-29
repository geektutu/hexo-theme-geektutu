var baseDir = ''
if (typeof window === 'undefined') {
  var config = require('../../server/config')
  baseDir = config.BASE_URL
}

export const GET_COUNT = baseDir + '/api/count'