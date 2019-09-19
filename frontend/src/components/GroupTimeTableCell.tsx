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
  const [open, setOpen] = React.useState(false);
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

  function confirmSelection(event: React.MouseEvent) {
    setOpen(true);
  }

  function handleSelection(selection: string) {
    setOpen(false);
  }

  return (
    <TimeTableTooltip {...props} percentage={percentage} members={availableMembers} >
      <TableCell className={classes.cell} onClick={(event: React.MouseEvent) => confirmSelection(event)}>
        <ConfirmTime
          open={open}
          day={props.day}
          time={props.time}
          handleSelection={handleSelection}
        />
      </TableCell>
    </TimeTableTooltip>
  )
}

GroupTimeTableCell.propTypes = {
  day: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  time: PropTypes.string.isRequired,
}

export default GroupTimeTableCell;