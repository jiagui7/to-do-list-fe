import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./toDoList.module.scss";
import { Divider, Typography } from "@material-ui/core";
import { Task } from "../../models/task";
import List from "./../list";

const taskListMock: Task[] = [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
  { id: 3, description: "Task 3", completed: false },
  { id: 4, description: "Task 4", completed: true },
  { id: 5, description: "Task 5", completed: false },
  { id: 6, description: "Task 6", completed: true },
  { id: 7, description: "Task 7", completed: false },
];

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    // TODO: Make API call
    setTaskList(taskListMock);
  }, []);

  return (
    <Paper elevation={3} className={styles["to-do-list"]}>
      <Typography variant="h2">To-Do List</Typography>
      <List elements={taskList.filter((t) => !t.completed)} />
      <Divider />
      <List elements={taskList.filter((t) => t.completed)} />
    </Paper>
  );
};

export default ToDoList;
