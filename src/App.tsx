import React from "react";
import ToDoList from "./components/to-do-list";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles["app"]}>
      <ToDoList />
    </div>
  );
}

export default App;
