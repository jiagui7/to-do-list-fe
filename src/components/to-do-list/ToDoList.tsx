import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./toDoList.module.scss";
import { Divider, Typography } from "@material-ui/core";
import { Task } from "../../models/task";
import List from "./../list";
import Config from "./../../utils/config";
import { Api } from "./../../api/api";

const service = new Api(Config.apiUrl);

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = React.useState<Task[]>([]);

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
      <Typography variant="h2" className={styles["to-do-list__title"]}>
        To-Do List
      </Typography>
      <div className={styles["to-do-list__list-container"]}>
        <List
          elements={taskList.filter((t) => !t.completed)}
          data-qa="pending-task-list"
        />
        <Divider />
        <List
          elements={taskList.filter((t) => t.completed)}
          data-qa="completed-task-list"
        />
      </div>
    </Paper>
  );
};

export default ToDoList;
