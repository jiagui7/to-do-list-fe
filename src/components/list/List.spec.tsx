import React from "react";
import { shallow } from "enzyme";
import List from ".";
import { Task } from "../../models/task";

const elements: Task[] = [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
  { id: 3, description: "Task 3", completed: false },
  { id: 4, description: "Task 4", completed: true },
  { id: 5, description: "Task 5", completed: false },
  { id: 6, description: "Task 6", completed: true },
  { id: 7, description: "Task 7", completed: false },
];

describe("<List />", () => {
  const setup = (elements: Task[]) => {
    const component = shallow(<List elements={elements} />);

    return { component, listItem: component.find('[data-qa="list-item"]') };
  };

  it("should render the list", () => {
    const { component, listItem } = setup(elements);

    expect(component).toHaveLength(1);
    expect(listItem).toHaveLength(elements.length);
  });
});
