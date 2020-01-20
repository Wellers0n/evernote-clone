import React from "react";
import ReactQuill from "react-quill";
import { removeHTMLTags } from "../helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, ListItem, ListItemText } from "@material-ui/core";
import styles from "./styles";

const SidebarItemComponent = props => {

  const { _note, _index, selectedNoteIndex, selectedNote, classes, DeleteNote } = props;

  const DeleteItem = (note) => {
      if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
        return DeleteNote(note)
      }
  }
  return (
    <div key={_index}>
      <ListItem className={classes.listItem} selected={selectedNoteIndex === _index} alignItems="flex-start">
        <div className={classes.textSection} onClick={() => selectedNote(_note, _index)}>
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteIcon onClick={() => DeleteItem(_note)} className={classes.deleteIcon}></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItemComponent);
