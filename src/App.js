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

  return (
    <div>
      <SidebarComponent />
      <EditorComponent/>
    </div>
  );
}

export default App;
