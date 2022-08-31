import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, addNote } = context;
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your notes</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes