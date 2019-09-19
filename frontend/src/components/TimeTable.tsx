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
import { Meeting, MeetingPropType } from '../types/Meeting';
import { testMembers } from '../testdata/testMembers';

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
  },
  timeText: {
    fontSize: 11,
  }
}));

function TimeTable (props: InferProps<typeof TimeTable.propTypes>) {
  const { isGroupTable } = props;
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState('');

  const classes = useStyles();

  function handleOpen(time: string) {
    setTime(time);
    setOpen(true);
  }

  function handleSelection() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <ConfirmTime
        open={open}
        time={time}
        handleSelection={handleSelection}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {days.map((day: string) => <TableCell>{day}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody className={classes.body}>
          {times.map((time: string) => (
            <TableRow>
              <TableCell className={classes.timeColumn}>
                <Typography className={classes.timeText}>{time}</Typography>
              </TableCell>
              {!isGroupTable && days.map((day: string) => <TimeTableCell />)}
              {isGroupTable && days.map((day: string) => (
                <GroupTimeTableCell
                  day={day}
                  members={testMembers}
                  time={time}
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
};

export default TimeTable;