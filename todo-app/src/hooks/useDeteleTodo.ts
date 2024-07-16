import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todos";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
