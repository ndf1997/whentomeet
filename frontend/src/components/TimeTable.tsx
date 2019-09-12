import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TimeTableCell from './TimeTableCell';

import { days, times } from '../types/constants';

const useStyles = makeStyles(() => createStyles({
  root: {
    width: '40%',
  },
  body: {
    userSelect: 'none',
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
              <TableCell>{time}</TableCell>
              {days.map((day: string) => <TimeTableCell />)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TimeTable;