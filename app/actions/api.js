var baseDir = ''
if (typeof window === 'undefined') {
  var config = require('../../server/config')
  baseDir = config.BASE_URL
}

export const GET_COUNT = baseDir + '/api/count'
export const GET_POSTS = baseDir + '/api/posts'