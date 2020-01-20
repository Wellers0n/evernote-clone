import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debouce from "../helpers";
import borderColorIcon from "@material-ui/icons";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const EditorComponent = props => {
  const { classes, selectedNote, selectedNoteIndex, notes } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const _onChange = async value => {
    await setText(value);
    update();
  };

  useEffect(() => {
    setTitle(selectedNote.title);
    setText(selectedNote.body);
    setId(selectedNote.id);
  }, [selectedNoteIndex]);

  const update = debouce(() => {
    props.noteUpdate(id, { title: title, body: text });
  }, 1500);

  const updateTitle = async txt => {
    await setTitle(txt);
  };

  return (
    <div className={classes.editorContainer}>
      <borderColorIcon className={classes.editIcon} />
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title ? title : ""}
        onChange={e => updateTitle(e.target.value)}
      />
      <ReactQuill value={text} onChange={_onChange}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(EditorComponent);
