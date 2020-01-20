import React, { useState } from "react";
import ReactQuill from "react-quill";
import debouce from "../helpers";
import borderColorIcon from "@material-ui/icons";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const EditorComponent = props => {
  const { classes } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const _onChange = async value => {
    await setText(value);
    update();
  };
  const update = debouce(() => {
    console.log("UPDATE");
  }, 1500);
  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={_onChange}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(EditorComponent);
