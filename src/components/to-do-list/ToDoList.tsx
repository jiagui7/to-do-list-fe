import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./toDoList.module.scss";
import { Divider, Typography } from "@material-ui/core";
import { Task } from "../../models/task";
import List from "./../list";
import Config from "./../../utils/config";
import { Api } from "./../../api/api";

const service = new Api(Config.apiUrl);

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    service
      .getAll()
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => console.error(err));
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
