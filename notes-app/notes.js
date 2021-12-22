const { log } = require('console')
const fs = require('fs')

const noteFile = './notes.json'

const getNotes = function () {
    return 'TODO complete this function'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        console.log(`Note: ${title} added`);
        notes.push({
            title: title,
            body: body,
        })
    } else {
        console.log(`Note title: ${title} is already taken`);
    }
    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const outNotes = []
    for (note of notes) {
        if (note.title != title) {
            outNotes.push(note)
        }
    }
    if (notes.length === outNotes.length) {
        console.log(`Note: ${title} not found`);
    } else {
        console.log(`Note: ${title} removed`);
        saveNotes(outNotes)
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

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}
