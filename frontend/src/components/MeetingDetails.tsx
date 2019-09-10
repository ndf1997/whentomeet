import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(2),
  },
  description: {
    maxWidth: 500,
  },
}));

function MeetingDetails() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom >
        Meeting Title
      </Typography>
      <Typography variant="body1" className={classes.description} >
        Here's a brief description of the meeting.
        It'll typically be a couple of lines.
        It'll wrap around like this. We can change the width of this component if we need to.
      </Typography>
    </div>
  );
}

export default MeetingDetails;
