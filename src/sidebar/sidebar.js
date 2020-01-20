import React, { useState } from "react";
import ReactQuill from "react-quill";
import debouce from "../helpers";
import borderColorIcon from "@material-ui/icons";
import { withStyles, Button } from "@material-ui/core";
import styles from "./styles";

const SidebarComponent = props => {
  const { classes } = props;
  const [addingNote, setAddingNotes] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setAddingNotes(!addingNote);
    setTitle(null);
  };

  const updateTitle = txt => {
    setTitle(txt)
  };

  const newNote = () => {
    console.log(title);
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
    </div>
  );
};

export default withStyles(styles)(SidebarComponent);
