import { useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props) => {
    const initialNotes = [{
        "_id": "62f0ca0074d056b38bf54fd5",
        "user": "62ee87e80e85fe1c81f64379",
        "title": "Process of creating new website (Mern Stack)",
        "description": "This is the demo description for process of creating a new website using MERN stack",
        "tag": "development",
        "date": "2022-08-08T08:32:00.091Z",
        "__v": 0
    },
    {
        "_id": "62f0ca0074d056b38bf54fd7",
        "user": "62ee87e80e85fe1c81f64379",
        "title": "Process of creating new website (Mern Stack)",
        "description": "This is the demo description for process of creating a new website using MERN stack",
        "tag": "development",
        "date": "2022-08-08T08:32:00.250Z",
        "__v": 0
    },
    {
        "_id": "62f0ca0074d056b38bf54fd9",
        "user": "62ee87e80e85fe1c81f64379",
        "title": "Process of creating new website (Mern Stack)",
        "description": "This is the demo description for process of creating a new website using MERN stack",
        "tag": "development",
        "date": "2022-08-08T08:32:00.415Z",
        "__v": 0
    },
    {
        "_id": "62f0ca0074d056b38bf54fdb",
        "user": "62ee87e80e85fe1c81f64379",
        "title": "Process of creating new website (Mern Stack)",
        "description": "This is the demo description for process of creating a new website using MERN stack",
        "tag": "development",
        "date": "2022-08-08T08:32:00.574Z",
        "__v": 0
    },
    {
        "_id": "62f0ca0074d056b38bf54fdd",
        "user": "62ee87e80e85fe1c81f64379",
        "title": "updated title",
        "description": "updated description",
        "tag": "updated_tag",
        "date": "2022-08-08T08:32:00.722Z",
        "__v": 0
    }]

    // Add a note
    const addNote = (title, description, tag) => {
        // todo api calls
        console.log("Adding a new note");
        const note = {
            "_id": "62f0casdfad074d056b38bf54fdg",
            "user": "62ee87e80e85fe1c81f64379",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-08-08T08:32:00.722Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // Delete a note
    const deleteNote = (id) => {
        console.log("delete note id# " + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a note
    const editNote = (id, title, description, tag) => {

    }
    const [notes, setNotes] = useState(initialNotes);
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;