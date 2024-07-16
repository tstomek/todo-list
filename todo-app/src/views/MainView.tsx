import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { useTodos } from "../hooks/useTodos";
import { useAddTodo } from "../hooks/useAddTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeteleTodo";
import { Search } from "@mui/icons-material";
import TodoItem from "../components/TodoItem";

const MainView = () => {
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);

  const { data: todos = [], isLoading } = useTodos();
  const addTodoMutation = useAddTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleSave = () => {
    if (editingTodo) {
      const todo = todos.find((todo) => todo.id === editingTodo);
      if (todo) {
        updateTodoMutation.mutate({ ...todo, title: newTitle });
        setEditingTodo(null);
        setNewTitle(newTitle);
      }
    } else {
      addTodoMutation.mutate(newTitle);
      setNewTitle("");
    }
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditingTodo(id);
      setNewTitle(todo.title);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        TODO List
      </Typography>
      <Box display="flex" alignItems="center" flexDirection={"row"}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="New TODO title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          margin="normal"
        />

        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: <Search />,
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSave}
      >
        {editingTodo ? "Update" : "Add"} TODO
      </Button>
      <List>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={() =>
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                })
              }
              onEdit={() => handleEdit(todo.id)}
              onDelete={() => deleteTodoMutation.mutate(todo.id)}
            />
          ))
        )}
      </List>
    </Container>
  );
};

export default MainView;
