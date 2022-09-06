import { useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []

    // Get all note
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZTg3ZTgwZTg1ZmUxYzgxZjY0Mzc5In0sImlhdCI6MTY1OTk0NzQ3OH0.kMfKAbPlHbyH4f5uJpEpkqgcBAUhyWClRp5ozf6kFTc'
            }
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json);

    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // todo api calls
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZTg3ZTgwZTg1ZmUxYzgxZjY0Mzc5In0sImlhdCI6MTY1OTk0NzQ3OH0.kMfKAbPlHbyH4f5uJpEpkqgcBAUhyWClRp5ozf6kFTc'
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        //client side logic
        console.log("Adding a new note");
        const note = {
            "_id": "63179813cc0fa8fa28ea053f",
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
    const deleteNote = async (id) => {
        // api call
        const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZTg3ZTgwZTg1ZmUxYzgxZjY0Mzc5In0sImlhdCI6MTY1OTk0NzQ3OH0.kMfKAbPlHbyH4f5uJpEpkqgcBAUhyWClRp5ozf6kFTc'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = response.json();
        console.log(json);
        // client side logic
        console.log("delete note id# " + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // api calls
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZTg3ZTgwZTg1ZmUxYzgxZjY0Mzc5In0sImlhdCI6MTY1OTk0NzQ3OH0.kMfKAbPlHbyH4f5uJpEpkqgcBAUhyWClRp5ozf6kFTc'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = response.json();
        // client side logic
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }
    const [notes, setNotes] = useState(initialNotes);
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;