
import React, { useEffect, useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
        //eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        if (!currentNote || !currentNote._id) {
            console.error("Invalid note object:", currentNote);
            return;
        }
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <h1>Edit Note</h1>
                                <form className="my-3" onSubmit={(e) => { e.preventDefault(); }}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required />
                                        <div id="emailHelp" className="form-text"></div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className='container'>
                    {notes.length === 0 && "no note to display"}
                </div>
                {Array.isArray(notes) && notes.map((note) => (
                    <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                ))}
            </div>
        </div>
    );
};

export default Notes;
