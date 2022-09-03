import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })
    const handleOnClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })  //get data from note using spread operator. save it as a list in []:"" like title:"reports on generic medicine"
    }
    return (

        <div className="container my-3">
            <h2>Add a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={onChange} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote