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
    const divSpace = new Array(5).join(' ')
    const maxWidth = getMaxWidth(notes)
    console.log(chalk.bold(addTrailingSpaces('Title', maxWidth) + divSpace + 'Body'));
    for (note of notes) {
        console.log(addTrailingSpaces(note.title, maxWidth) + divSpace + note.body)
    }
}

const addTrailingSpaces = (str, stringWidth) => {
    let output = str + new Array(stringWidth).join(' ')
    return output.substring(0, stringWidth)
}

const getMaxWidth = (notes) => {
    let maxWidth = 5
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
