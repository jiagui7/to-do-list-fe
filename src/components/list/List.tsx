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
import { green } from "@material-ui/core/colors";

const SuccessCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface Props {
  elements: Task[];
}

const List: React.FC<Props> = ({ elements }) => {
  return (
    <ListComponent>
      {elements.map((v, _) => {
        const { id, description, completed } = v;
        return (
          <ListItem key={id}>
            <ListItemText
              primary={description}
              className={clsx(styles["list__description"], {
                [styles["list__description--completed"]]: completed,
              })}
            />
            <ListItemSecondaryAction>
              <SuccessCheckbox checked={completed} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </ListComponent>
  );
};

export default List;
