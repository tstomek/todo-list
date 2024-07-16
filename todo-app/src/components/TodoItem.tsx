// src/components/TodoItem.tsx
import React from "react";
import { Todo } from "../types/types";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface TodoItemProps {
  todo: Todo;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onComplete,
  onEdit,
  onDelete,
}) => (
  <>
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={onEdit}>
            <EditNoteIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <Checkbox checked={todo.completed} onChange={onComplete} />
      <ListItemText
        primary={todo.title}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      />
    </ListItem>
    <Divider />
  </>
);

export default TodoItem;
