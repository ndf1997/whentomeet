import React from 'react';
import { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { MeetingPropType } from '../types/Meeting';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(2),
  },
  description: {
    maxWidth: 500,
  },
}));

function MeetingDetails(props: InferProps<typeof MeetingDetails.propTypes>) {
  const { meeting } = props;
  const classes = useStyles();
  const isSelected = meeting.selectedTime !== '';

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom >
        {meeting.title}
      </Typography>
      <Typography variant="body1" className={isSelected ? '' : classes.description} >
        {meeting.description}
      </Typography>
      <Typography variant="body1">
        Location: {meeting.location}
      </Typography>
      {isSelected &&
        <Typography variant="body1">
          Meeting Time: {meeting.selectedTime}
        </Typography>
      }
    </div>
  );
}

MeetingDetails.propTypes = {
  meeting: MeetingPropType.isRequired,
}

export default MeetingDetails;
