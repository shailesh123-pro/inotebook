import React, { useState } from "react";

import noteContext from "./noteContext";

// import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)  /*here i used the usedState in NoteState  */

   // get all Note

   const getNotes = async () => {
    // API call , i.e backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyODIxZGNkNjVmNDA3ODBkMzlkNzljIn0sImlhdCI6MTY4MDM1MTcwOH0.YKJw6AKGgEa-Dd44uAa9eInKa-aERwvJMlGrfQEDYyE"
      },
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  // Add a Note

  const addNote = async (title, description, tag) => {
    // TODO: API call
    // API call , i.e backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyODIxZGNkNjVmNDA3ODBkMzlkNzljIn0sImlhdCI6MTY4MDM1MTcwOH0.YKJw6AKGgEa-Dd44uAa9eInKa-aERwvJMlGrfQEDYyE"
      },
      body: JSON.stringify({title , description , tag})
    });
    // const json = response.json();
    

    // add note logic  

    console.log("adding a new note")
    const note = {
      "_id": "643c215c890c4b68b3f8239d",
      "user": "642821dcd65f40780d39d79c",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-04-16T16:25:00.539Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  // Delete a Note

  const deleteNote = async(id) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyODIxZGNkNjVmNDA3ODBkMzlkNzljIn0sImlhdCI6MTY4MDM1MTcwOH0.YKJw6AKGgEa-Dd44uAa9eInKa-aERwvJMlGrfQEDYyE"
      }
    });
    const json = response.json();
    console.log(json)
    console.log("Delete a Note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API call , i.e backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyODIxZGNkNjVmNDA3ODBkMzlkNzljIn0sImlhdCI6MTY4MDM1MTcwOH0.YKJw6AKGgEa-Dd44uAa9eInKa-aERwvJMlGrfQEDYyE"
      },
      body: JSON.stringify({title , description , tag})
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }


  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote ,getNotes}}> {/* this is main syntax of the react contex api , line important all 3*/}
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;