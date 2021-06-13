import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./toDoList.module.scss";
import { Divider, Typography, TextField, IconButton } from "@material-ui/core";
import { Task } from "../../models/task";
import List from "./../list";
import Config from "./../../utils/config";
import { Api } from "./../../api/api";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const service = new Api(Config.apiUrl);

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = React.useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const getAll = () => {
    service
      .getAll()
      .then((res) => {
        setTaskList(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAll();
  }, []);

  const onAddTask = () => {
    service
      .add(newTask)
      .then(async () => {
        getAll();
        setNewTask("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Paper elevation={3} className={styles["to-do-list"]}>
      <Typography variant="h2" className={styles["to-do-list__title"]}>
        To-Do List
      </Typography>
      <div className={styles["to-do-list__input-form"]}>
        <TextField
          label="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          data-qa="input-field"
        />
        <IconButton onClick={onAddTask} data-qa="add-button">
          <AddCircleRoundedIcon />
        </IconButton>
      </div>

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
