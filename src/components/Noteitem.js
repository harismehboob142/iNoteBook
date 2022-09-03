import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-square-pen mx-2"></i>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Noteitem