import { Todo } from "../types/types";

let todos: Todo[] = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Plan a weekend getaway", completed: false },
  { id: 3, title: "Read a book", completed: false },
  { id: 4, title: "Exercise for 30 minutes", completed: false },
  { id: 5, title: "Organize the garage", completed: false },
];

export const fetchTodos = async (): Promise<Todo[]> => {
  return new Promise<Todo[]>((resolve) => {
    setTimeout(() => resolve([...todos]), 100);
  });
};

export const addTodo = async (newTodo: Todo): Promise<Todo> => {
  todos = [...todos, newTodo];
  return new Promise<Todo>((resolve) => {
    setTimeout(() => resolve(newTodo), 100);
  });
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  todos = todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  );
  return new Promise<Todo>((resolve) => {
    setTimeout(() => resolve(updatedTodo), 100);
  });
};
export const deleteTodo = async (id: number): Promise<void> => {
  todos = todos.filter((todo) => todo.id !== id);
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 100);
  });
};
