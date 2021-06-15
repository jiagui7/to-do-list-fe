import React, { useEffect, useState } from "react";
import styles from "./toDoList.module.scss";
import {
  Divider,
  Typography,
  TextField,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { Task } from "../../models/task";
import List from "./../list";
import Config from "./../../utils/config";
import { Api } from "./../../api/api";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import DoneIcon from "@material-ui/icons/Done";
import clsx from "clsx";

const service = new Api(Config.apiUrl);

export const EMPTY_DESCRIPTION_ERROR = "Cannot be empty";
export const DESCRIPTION_LIMIT_ERROR = "Maximum 24 characters";

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = React.useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState<string>("");

  const pendingTasks = taskList.filter((t) => !t.completed);
  const completedTasks = taskList.filter((t) => t.completed);
  const percertageCompleted =
    100 - (pendingTasks.length / taskList.length) * 100;

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

  const handleAddTask = () => {
    setError("");
    if (!newTask) {
      setError(EMPTY_DESCRIPTION_ERROR);
    } else if (newTask.length > 24) {
      setError(DESCRIPTION_LIMIT_ERROR);
    } else {
      service
        .add(newTask)
        .then(async () => {
          getAll();
          setNewTask("");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUpdateTask = (id: number, completed: boolean) => {
    service
      .patch(id, completed)
      .then(async () => {
        getAll();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles["to-do-list"]}>
      <Typography variant="h3" className={styles["to-do-list__title"]}>
        To-Do List
      </Typography>
      <div className={styles["to-do-list__input-form"]}>
        <TextField
          error={!!error}
          label="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          helperText={error}
        />
        <IconButton onClick={handleAddTask} data-qa="add-button">
          <AddCircleRoundedIcon
            fontSize="large"
            className={styles["to-do-list__add-button"]}
          />
        </IconButton>
      </div>

      <div className={styles["to-do-list__progress-container"]}>
        <LinearProgress
          variant="determinate"
          value={percertageCompleted}
          className={styles["to-do-list__progress"]}
        />
        <span data-qa="progress-label">{`${completedTasks.length}/${taskList.length}`}</span>
        <DoneIcon
          className={clsx(styles["to-do-list__check-icon"], {
            [styles["to-do-list__check-icon--completed"]]:
              percertageCompleted === 100,
          })}
        />
      </div>

      <div className={styles["to-do-list__list-container"]}>
        <List
          elements={pendingTasks}
          onChange={handleUpdateTask}
          data-qa="pending-task-list"
        />
        {completedTasks.length > 0 && (
          <>
            <Divider />
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >{`${completedTasks.length} tasks completed`}</Typography>
          </>
        )}
        <List
          elements={completedTasks}
          onChange={handleUpdateTask}
          data-qa="completed-task-list"
        />
      </div>
    </div>
  );
};

export default ToDoList;
