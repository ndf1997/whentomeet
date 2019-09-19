import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TimeTableTooltip from './TimeTableTooltip';
import ConfirmTime from './ConfirmTime';

import { Member } from '../types/Member';
import { Day } from '../types/Day';

function findAvailableMembers(day: string, members: Member[], time: string) {
  let availableMembers: Member[] = [];
  members.forEach((member: Member) => {
    member.days.forEach((d: Day) => {
      if (d.name === day && d.hours.includes(time)) {
        availableMembers.push(member);
      }
    })
  });

  return availableMembers;
}

function GroupTimeTableCell (props: InferProps<typeof GroupTimeTableCell.propTypes>) {
  const { day, members, time } = props;
  const availableMembers: Member[] = findAvailableMembers(day, members, time);
  const percentage: string = Math.floor((availableMembers.length / members.length) * 100) + '%';

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
        width: percentage,
      },
    },
  }))();

  return (
    <TimeTableTooltip {...props} percentage={percentage} members={availableMembers} >
      <TableCell className={classes.cell} onClick={() => props.handleOpen(`${props.day}, ${props.time}`)}>
      </TableCell>
    </TimeTableTooltip>
  )
}

GroupTimeTableCell.propTypes = {
  day: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  time: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
}

export default GroupTimeTableCell;