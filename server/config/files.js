const LRU = require('lru-cache')
let files = new LRU({max: 1000})

export default files
