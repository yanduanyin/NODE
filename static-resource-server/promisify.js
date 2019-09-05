const fs = require('fs');
const util = require('util')

const readFile = util.promisify(fs.readFile);
  
  readFile('./index.js', 'utf8',).then(data => {
    console.log('data-', data)
  })
  fs.readFile('./index.js', 'utf8', (err, data) => {
    console.log(data)
})
// fs.readFile().then();
