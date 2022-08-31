import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
    const s1 = {
        "name": "haris",
        "class": "bscs"
    }
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "haris mehboob",
                "class": "bscs 7B"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;