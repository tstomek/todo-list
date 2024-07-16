// src/hooks/useAddTodo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../api/todos";
import { Todo } from "../types/types";

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, string>({
    mutationFn: (title: string) =>
      addTodo({
        id: Date.now(),
        title,
        completed: false,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
