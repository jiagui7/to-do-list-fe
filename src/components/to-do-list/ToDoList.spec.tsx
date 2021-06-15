import React from "react";
import { shallow } from "enzyme";
import { Task } from "../../models/task";
import ToDoList, {
  EMPTY_DESCRIPTION_ERROR,
  DESCRIPTION_LIMIT_ERROR,
} from "./ToDoList";
import { TextField, IconButton } from "@material-ui/core";

const elements: Task[] = [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
  { id: 3, description: "Task 3", completed: false },
  { id: 4, description: "Task 4", completed: true },
  { id: 5, description: "Task 5", completed: false },
  { id: 6, description: "Task 6", completed: true },
  { id: 7, description: "Task 7", completed: false },
];

describe("<ToDoList />", () => {
  beforeEach(() => {
    jest.spyOn(React, "useState").mockReturnValue([elements, jest.fn()]);
  });

  const setup = () => {
    const component = shallow(<ToDoList />);

    return {
      component,
      pendingTaskList: component.find('[data-qa="pending-task-list"]'),
      completedTaskList: component.find('[data-qa="completed-task-list"]'),
      progressLabel: component.find('[data-qa="progress-label"]'),
    };
  };

  it("should render the component", () => {
    const { component, pendingTaskList, completedTaskList, progressLabel } =
      setup();
    const pendingTasks = elements.filter((t) => !t.completed);
    const completedTasks = elements.filter((t) => t.completed);

    expect(component).toHaveLength(1);
    expect(pendingTaskList).toHaveLength(1);
    expect(completedTaskList).toHaveLength(1);
    expect(pendingTaskList.prop("elements") as Task[]).toStrictEqual(
      pendingTasks
    );
    expect(completedTaskList.prop("elements") as Task[]).toStrictEqual(
      completedTasks
    );
    expect(progressLabel.text()).toBe(
      `${completedTasks.length}/${elements.length}`
    );
  });

  describe("when a new task is entered", () => {
    it("should notify an error if the description is empty", () => {
      const { component } = setup();
      const description = "";

      component
        .find(TextField)
        .at(0)
        .simulate("change", { target: { value: description } });
      component.find(IconButton).simulate("click");

      expect(component.find(TextField).prop("helperText")).toBe(
        EMPTY_DESCRIPTION_ERROR
      );
    });

    it("should notify an error if the description has more than the characters limit", () => {
      const { component } = setup();
      const description = "Description more long than expected";

      component
        .find(TextField)
        .at(0)
        .simulate("change", { target: { value: description } });
      component.find(IconButton).simulate("click");

      expect(component.find(TextField).prop("helperText")).toBe(
        DESCRIPTION_LIMIT_ERROR
      );
    });
  });
});
