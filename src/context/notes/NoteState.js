import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes..............................................................................................................................
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json()
            setNotes(json);
            console.log(notes)
        } catch (error) {
            console.error(error);
            // Handle the error here, e.g. by showing an error message to the user
        }
    }

    //Add a note ......................................................................................................................
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }



    //delete a note......................................................................................................................
    const deleteNote = async (id) => {

        //Api call\
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    }

    //edit a note......................................................................................................................
    const editNote = async (id, title, description, tag) => {
        console.log(id)
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json();


        let newNote = JSON.parse(JSON.stringify(notes))
        //logic to edeit client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }


        }
        setNotes(newNote)
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
