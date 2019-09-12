import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TimeTableCell from './TimeTableCell';

import { days, times } from '../types/constants';

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

function TimeTable () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
              {days.map((day: string) => <TimeTableCell />)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TimeTable;