// import React from 'react'
import React, { useContext , useState} from 'react'
import noteContext from '../Context/noteContext';

const AddNote = () => {
    const context = useContext(noteContext); /* destructuring  */
    const {addNote} = context;

    const [note , setNote] = useState({title: "" , description: "" , tag: "default"})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title ,note.description , note.tag);
    }

    const onChange = (e) =>{
        setNote({...note , [e.target.name]: e.target.value})
    }

    return (
        <div className='container my-3'>
            <h1>Add the Notes</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote
