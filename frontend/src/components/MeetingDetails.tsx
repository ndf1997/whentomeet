import React from 'react';
import { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MeetingPropType } from '../types/Meeting';
import EditMeeting from './EditMeeting';

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
  const isSelected = meeting.selectedTime !== 'none';
  const [title, setTitle] = React.useState(meeting.title);
  const [location, setLocation] = React.useState(meeting.location);
  const [description, setDescription] = React.useState(meeting.description);
  const [open, setOpen] = React.useState(false);
  
  function titleHandler(titleEdit: string) {
    setTitle(titleEdit);
  }
    
  function locationHandler(locationEdit: string) {
    setLocation(locationEdit);
  }
  function descriptionHandler(descriptionEdit: string) {
    setDescription(descriptionEdit);
  }
  function editHandler() {
    setOpen(false);
  }
  function meetingEdit() {
    setOpen(true);
  }
  return (
    <div className={classes.root}>
      <EditMeeting 
        meeting={meeting}
        titleHandler={titleHandler} 
        descriptionHandler={descriptionHandler}
        locationHandler={locationHandler}
        open={open}
        editHandler={editHandler}/>
      <Typography variant="h3" gutterBottom >
        {title}
      </Typography>
      <Typography variant="body1" className={isSelected ? '' : classes.description} >
        {description}
      </Typography>
      <Typography variant="body1">
        Location: {location}
      </Typography>
      {!isSelected &&
        <Typography variant="body1">
          Invite URL: {meeting.url}
        </Typography>
      }
      {isSelected &&
        <Typography variant="body1">
          Meeting Time: {meeting.selectedTime}
        </Typography>
      }
      {!isSelected &&
        <Button variant="outlined" onClick={meetingEdit}>
          Edit Meeting
        </Button>
      }
    </div>
  );
}

MeetingDetails.propTypes = {
  meeting: MeetingPropType.isRequired,
}

export default MeetingDetails;
