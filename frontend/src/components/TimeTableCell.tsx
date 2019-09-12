import React, { useState, MouseEvent} from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(() => createStyles({
  root: {},
  selected: {
    backgroundColor: 'teal',
  },
}))

function TimeTableCell () {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => {
    setIsSelected(!isSelected);
  }

  const hoverHandler = (event: MouseEvent) => {
    if (event.buttons === 1) {
      clickHandler();
    }
  }

  return (
    <TableCell
      className={clsx(classes.root, {
        [classes.selected]: isSelected,
      })}
      onMouseDown={clickHandler}
      onMouseEnter={event => hoverHandler(event)}
    />
  )
}

export default TimeTableCell;