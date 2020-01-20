import React, { useState, useEffect } from "react";
import "./App.css";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

import firebase from "firebase";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection(`notes`)
      .onSnapshot(snapshot => {
        const notes = snapshot.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log("notes", notes);
        setNotes(notes);
      });
  }, []);

  const selectNote = (note, index) => {
    console.log(note, index);
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  const noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  const newNote = async title => {
    const note = {
      title: title,
      body: ""
    };
    const newFromDB = await firebase
      .firestore()
      .collection("notes")
      .add({ title: note.title, body: note.body, timestamp: firebase.firestore.FieldValue.serverTimestamp() });

    const newId = newFromDB.id;
    await setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newId)[0]);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  };

  const deleteNote = async note => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter(_note => _note !== note))
    if (selectedNoteIndex === noteIndex) {
      setSelectedNote(null);
      setSelectedNoteIndex(null);
    } else {
      if (notes.length > 1) {
        selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1);
      } else {
        setSelectedNote(null);
        setSelectedNoteIndex(null);
      }
    }
    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  return (
    <div>
      <SidebarComponent
        deleteNote={deleteNote}
        newNote={newNote}
        selectNote={selectNote}
        notes={notes || []}
        selectedNoteIndex={selectedNoteIndex}
      />
      {selectedNote && (
        <EditorComponent
          noteUpdate={noteUpdate}
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes || []}
        />
      )}
    </div>
  );
}

export default App;
