import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Meeting, MeetingPropType } from '../types/Meeting';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(2),
  },
  description: {
    maxWidth: 500,
  },
}));

function MeetingDetails(props: InferProps<typeof MeetingDetails.propTypes>) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom >
        {props.meeting.title}
      </Typography>
      <Typography variant="body1" className={classes.description} >
        {props.meeting.description}
      </Typography>
      <Typography variant="body1">
        Location: {props.meeting.location}
      </Typography>
    </div>
  );
}

MeetingDetails.propTypes = {
  meeting: MeetingPropType.isRequired,
}

export default MeetingDetails;
