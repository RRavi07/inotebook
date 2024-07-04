// import React, { useContext } from 'react';
// import noteContext from '../context/notes/noteContext'

// const Noteitem = (props) => {
//     const context = useContext(noteContext);
//     const { note,updateNote } = props;
//     const {deleteNote}= context;
//     return (
//         <div className="col-md-3">
//             <div className="card my-3" style={{ width: '17rem' }}>
//                 <div className="card-body">
//                     <h5 className="card-title">{note.title}</h5>
//                     <p className="card-text">{note.description}</p>
//                     <div className="d-flex">
//                         <span className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={()=>{deleteNote(note._id)}}></span>
//                         <span className="fa-regular fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={()=>{updateNote()}}></span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Noteitem;
import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote } = props;
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: '17rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex">
                        <span className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={() => { deleteNote(note._id) }}></span>
                        <span className="fa-regular fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={() => { updateNote(note) }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Noteitem;
