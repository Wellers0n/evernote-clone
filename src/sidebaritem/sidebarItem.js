import React from "react";
import ReactQuill from "react-quill";
import debouce from "../helpers";
import borderColorIcon from "@material-ui/icons";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const SidebarItemComponent = () => {
    return (
        <div>Hello from the sidebar item</div>
    )
}

export default withStyles(styles)(SidebarItemComponent)