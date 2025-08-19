"use client";
import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/custom";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { useState } from "react";
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function TodoItem({
  todo,
  optimisticUpdate,
}: {
  todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  return (
    <form>
      <TodoCard optimisticUpdate={optimisticUpdate} todo={todo} />
    </form>
  );
}

export function TodoCard({
  todo,
  optimisticUpdate,
}: {
      todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const { pending } = useFormStatus();
  const [checked, setStatus] = useState(todo.status);
  return (
    
    <Card className={cn("w-full", pending && "opacity-50")}>
      <CardContent className="flex items-start gap-3 p-3">
        <p className={cn("flex-1 pt-2 min-w-0 break-words")}>{todo.task}</p>

        
          <Select
            disabled={pending}
            defaultValue={String(todo.status)}
            onValueChange={async (val) => {
              setStatus(val);
              await updateTodo({ ...todo, status: val });
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Set status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        <Button
          disabled={pending}
          formAction={async (data) => {
            optimisticUpdate({ action: "delete", todo });
            await deleteTodo(todo.id);
          }}
          variant="ghost"
          size="icon"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  );
}

