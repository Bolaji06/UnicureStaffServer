
const fs = require('node:fs');
const path = require('node:path');

/**
 * 
 * @param {String} filePath 
 */
async function readFile(filePath){
   const html = fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) console.log(err)
        //console.log(data)
        return data;
    })
}

module.exports = readFile;