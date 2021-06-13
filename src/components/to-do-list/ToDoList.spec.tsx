import React from "react";
import { shallow } from "enzyme";
import { Task } from "../../models/task";
import ToDoList from ".";

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
  const setup = () => {
    const component = shallow(<ToDoList />);

    return {
      component,
      pendingTaskList: component.find('[data-qa="pending-task-list"]'),
      completedTaskList: component.find('[data-qa="completed-task-list"]'),
    };
  };

  it("should render the component", () => {
    jest.spyOn(React, "useState").mockReturnValue([elements, jest.fn()]);
    const { component, pendingTaskList, completedTaskList } = setup();

    expect(component).toHaveLength(1);
    expect(pendingTaskList).toHaveLength(1);
    expect(completedTaskList).toHaveLength(1);
    expect(pendingTaskList.prop("elements") as Task[]).toStrictEqual(
      elements.filter((e) => !e.completed)
    );
    expect(completedTaskList.prop("elements") as Task[]).toStrictEqual(
      elements.filter((e) => e.completed)
    );
  });
});
