import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TimeTableCell from './TimeTableCell';
import GroupTimeTableCell from './GroupTimeTableCell';
import ConfirmTime from './ConfirmTime';

import { days, times } from '../types/constants';
import { MeetingPropType } from '../types/Meeting';
import { MemberPropType } from '../types/Member';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '40%',
    marginLeft: theme.spacing(3),
  },
  body: {
    userSelect: 'none',
  },
  timeColumn: {
    padding: 1,
    borderRight: 'solid',
    borderRightColor: 'rgba(0, 0, 0, 0.07)',
    borderRightWidth: '1px',
  },
  timeText: {
    fontSize: 11,
  }
}));

function TimeTable (props: InferProps<typeof TimeTable.propTypes>) {
  const { meeting, member, isGroupTable, updateTimes, selectTime } = props;
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState('');
  const [timePicked, setTimePicked] = React.useState(false);
  let filteredDays: string[] = [];
  if (isGroupTable) {
    for(let i = 0; i < days.length; i++) {
      for(let j = 0; j < meeting.members.length; j++) {
        if (meeting.members[j].days[i].hours.includes(true)) {
          filteredDays.push(days[i]);
          break;
        }
      }
    }
  } else {
    filteredDays = days;
  }

  const classes = useStyles();

  function handleOpen(time: string) {
    if (timePicked) return;
    setTime(time);
    setOpen(true);
  }

  function handleSelection(time: string) {
    setTimePicked(true);
    if (time !== '') {
      selectTime(time);
    }
    setOpen(false);
  }

  if (filteredDays.length === 0) {
    return (
      <div className={classes.root}>
        <Typography>
          No times selected by group members.
        </Typography>
      </div>)
  }

  return (
    <div className={classes.root}>
      {meeting.creatorId == member.member_id && 
      <ConfirmTime
        open={open}
        time={time}
        handleSelection={handleSelection}
      /> }
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {filteredDays.map((day: string) => <TableCell>{day}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody className={classes.body}>
          {times.map((time: string, index: number) => (
            <TableRow>
              <TableCell className={classes.timeColumn}>
                <Typography className={classes.timeText}>{time}</Typography>
              </TableCell>
              {!isGroupTable && filteredDays.map((day: string) => (
                <TimeTableCell
                  member={member}
                  day={day}
                  index={index}
                  updateTimes={updateTimes}
                />))
              }
              {isGroupTable && filteredDays.map((day: string) => (
                <GroupTimeTableCell
                  day={day}
                  members={meeting.members}
                  time={time}
                  index={index}
                  handleOpen={handleOpen}
                />))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

TimeTable.propTypes = {
  isGroupTable: PropTypes.bool,
  meeting: MeetingPropType.isRequired,
  member: MemberPropType.isRequired,
  updateTimes: PropTypes.func.isRequired,
  selectTime: PropTypes.func.isRequired,
};

export default TimeTable;