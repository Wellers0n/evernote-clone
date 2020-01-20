import React, { useState } from "react";
import ReactQuill from "react-quill";
import debouce from "../helpers";
import borderColorIcon from "@material-ui/icons";
import SidebarItemComponent from "./../sidebaritem/sidebarItem";
import { withStyles, Button, List, Divider } from "@material-ui/core";
import styles from "./styles";

const SidebarComponent = props => {
  const { classes, notes, selectedNoteIndex, selectNote } = props;
  const [addingNote, setAddingNotes] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setAddingNotes(!addingNote);
    setTitle(null);
  };

  const updateTitle = txt => {
    setTitle(txt);
  };

  const newNote = () => {
    props.newNote(title)
    newNoteBtnClick()
  };

  // const selectedNote = () => {
  //   console.log("selected note");
  // };

  const DeleteNote = (note) => {
    props.deleteNote(note)
  };

  return (
    <div className={classes.sidebarContainer}>
      <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
        New Note
      </Button>
      {addingNote && (
        <div>
          <input
            className={classes.newNoteInput}
            placeholder="Enter note title"
            type="text"
            onKeyUp={e => updateTitle(e.target.value)}
          />
          <Button onClick={newNote} className={classes.newNoteSubmitBtn}>
            Submit note
          </Button>
        </div>
      )}
      <List>
        {notes.map((_note, _index) => {
          return (
            <div key={_index}>
              <SidebarItemComponent
                _note={_note}
                _index={_index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={selectNote}
                DeleteNote={DeleteNote}
              ></SidebarItemComponent>
              <Divider></Divider>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default withStyles(styles)(SidebarComponent);
