const { log } = require('console')
const chalk = require('chalk')
const fs = require('fs')

const noteFile = './notes.json'

const getNotes = () => {
    return 'TODO complete this function'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note => note.title === title)
    if (duplicateNotes.length > 0) {
        console.log(chalk.red(`Note title: '${title}' is already taken`));
    } else {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.green(`Note: ${title} added`));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const outNotes = notes.filter(note => note.title !== title)
    if (notes.length === outNotes.length) {
        console.log(chalk.red(`Note: '${title}' not found`));
    } else {
        saveNotes(outNotes)
        console.log(chalk.green(`Note: ${title} removed`));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync(noteFile, dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(noteFile)
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    const maxWidth = getMaxWidth(notes)
    const header = formatOutput('Title', 'Note', maxWidth)
    console.log(chalk.bold(header));
    for (note of notes) {
        console.log(formatOutput(note.title, note.body, maxWidth))
    }
}

const formatOutput = (title, body, maxWidth) => {
    if (title.length < maxWidth) {
        return `${title + new Array(maxWidth - title.length + 1).join(' ')}  ${body}`
    } else {
        return `${title}  ${body}`
    }
}

const getMaxWidth = (notes) => {
    let maxWidth = 0
    for (note of notes) {
        if (note.title.length > maxWidth) {
            maxWidth = note.title.length
        }
    }
    return maxWidth
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
}
