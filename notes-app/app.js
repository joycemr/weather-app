const getNotes = require('./notes')
const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: () => {
        console.log('Adding a new note')
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: () => {
        console.log('Remove a note')
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        console.log('Listing all notes')
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log('Reading a note')
    }
})

// need this line for it all to work.
// not a big fan of yargs at this point
yargs.argv

// this line also makes it work.
// you have to access the .argv object
// but it has to be after the above code
// console.log(yargs.argv)
