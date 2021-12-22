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
        notes.push({
            title: title,
            body: body,
        })
    } else {
        console.log(`Note title: ${title} is already taken`);
    }
    saveNotes(notes)
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
}
