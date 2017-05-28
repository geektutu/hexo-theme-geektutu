const fs = require('fs');
const path = require('path');

module.exports = (router) => {
  let baseDir = path.join(__dirname, '/controllers')  ;
  let jsFiles = fs.readdirSync(baseDir).filter((f) => f.endsWith('.js'));

  jsFiles.forEach(file => {
    let mappings = require(path.join(__dirname, '/controllers/' + file)) || {};
    Object.keys(mappings).forEach(key => {
      let [method, path] = key.split(" ");
      if (router[method.toLowerCase()] instanceof Function) {
        router[method.toLowerCase()](path, mappings[key])
        console.log(`register URL mapping: ${method}: ${path}`)
      }
    })
  })
}