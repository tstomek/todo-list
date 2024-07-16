import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";
import { Todo } from "../types/types";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
