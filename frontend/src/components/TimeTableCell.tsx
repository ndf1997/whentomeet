import React, { useState, MouseEvent} from 'react';
import clsx from 'clsx';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(() => createStyles({
  root: {},
  selected: {
    backgroundColor: '#8bc34a',
  },
}))

function TimeTableCell (props: InferProps<typeof TimeTableCell.propTypes>) {
  const { day, index, updateTimes } = props;
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => {
    updateTimes(day, index);
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

TimeTableCell.propTypes = {
  day: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  updateTimes: PropTypes.func.isRequired,
}

export default TimeTableCell;