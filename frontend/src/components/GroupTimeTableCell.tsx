import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(() => createStyles({
  cell: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      background: 'teal',
      top: 0,
      bottom: 0,
      left: 0,
      width: '40%'
    },
  },
}));

function GroupTimeTableCell () {
  const classes = useStyles();

  return (
    <TableCell className={classes.cell} >
    </TableCell>
  )
}

export default GroupTimeTableCell;