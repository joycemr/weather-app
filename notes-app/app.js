const notes = require('./notes')
const yargs = require('yargs')
const { string } = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: string,
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: string,
        },
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
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
yargs.parse()
