import {
  ListItemText,
  ListItemSecondaryAction,
  ListItem,
  Checkbox,
  List as ListComponent,
  withStyles,
  CheckboxProps,
} from "@material-ui/core";
import React from "react";
import { Task } from "../../models/task";
import styles from "./list.module.scss";
import clsx from "clsx";

const SuccessCheckbox = withStyles({
  root: {
    color: "#1769aa",
    "&$checked": {
      color: "#2196f3",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface Props {
  elements: Task[];
  onChange: (id: number, completed: boolean) => void;
}

const List: React.FC<Props> = ({ elements, onChange }) => {
  return (
    <ListComponent>
      {elements.map((v, _) => {
        const { id, description, completed } = v;
        return (
          <ListItem key={id} data-qa="list-item">
            <ListItemText
              primary={description}
              className={clsx(styles["list__description"], {
                [styles["list__description--completed"]]: completed,
              })}
            />
            <ListItemSecondaryAction>
              <SuccessCheckbox
                checked={Boolean(completed)}
                onChange={(e) => onChange(id, e.target.checked)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </ListComponent>
  );
};

export default List;
