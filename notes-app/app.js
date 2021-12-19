const fs = require('fs')

const file = 'notes.txt'
const text = 'Line 7'


try {
    fs.appendFileSync(file, `\n${text}`)
    console.log('The "data to append" was appended to file!');
} catch (err) {
    console.log(err);
}