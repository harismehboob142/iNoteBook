import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
export const About = () => {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>This is about component and the name is {a.state.name}</div>
    )
}
