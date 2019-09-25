import React, { useState, MouseEvent} from 'react';
import clsx from 'clsx';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

import { Day } from '../types/Day';
import { MemberPropType, Member } from '../types/Member';

const useStyles = makeStyles(() => createStyles({
  root: {},
  selected: {
    backgroundColor: '#8bc34a',
  },
}))

function defaultSelected(member: Member, day: string, index: number) {
  for (let i = 0; i < member.days.length; i++) {
    const d: Day = member.days[i];
    if (d.name === day && d.hours[index]) {
      return true;
    }
  }
  return false;
}

function TimeTableCell (props: InferProps<typeof TimeTableCell.propTypes>) {
  const { day, member, index, updateTimes } = props;
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(defaultSelected(member, day, index));

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
  member: MemberPropType.isRequired,
  index: PropTypes.number.isRequired,
  updateTimes: PropTypes.func.isRequired,
}

export default TimeTableCell;