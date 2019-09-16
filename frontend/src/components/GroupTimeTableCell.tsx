import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

import { Member } from '../types/Member';
import { Day } from '../types/Day';

function calculatePercentage(day: string, members: Member[], time: string) {
  let numberSelected: number = 0;
  members.forEach((member: Member) => {
    member.days.forEach((d: Day) => {
      if (d.name === day && d.hours.includes(time)) {
        numberSelected++;
      }
    })
  });

  return Math.floor((numberSelected / members.length) * 100) + '%';
}

function GroupTimeTableCell (props: InferProps<typeof GroupTimeTableCell.propTypes>) {
  const { day, members, time } = props;

  const classes = makeStyles(() => createStyles({
    cell: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        background: 'teal',
        top: 0,
        bottom: 0,
        left: 0,
        width: calculatePercentage(day, members, time),
      },
    },
  }))();

  return (
    <TableCell className={classes.cell}>
    </TableCell>
  )
}

GroupTimeTableCell.propTypes = {
  day: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  time: PropTypes.string.isRequired,
}

export default GroupTimeTableCell;