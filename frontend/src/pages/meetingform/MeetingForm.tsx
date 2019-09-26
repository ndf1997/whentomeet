import React from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddTitle from '../../components/AddTitle';
import AddDescription from '../../components/AddDescription';
import AddLocation from '../../components/AddLocation';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {History} from 'history';
import { serverURL } from '../../types/constants';
import PropTypes, {InferProps} from 'prop-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(66),
    marginRight: theme.spacing(66),
    marginTop: theme.spacing(12),
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  paper: {
    textAlign: 'center',
    square: 'true',
    alignItems: 'flex'
    
  }
}));

interface MeetingFormProps {
  history: History
}

function MeetingForm(props: MeetingFormProps) {
  
  const [title, setTitle] = React.useState();
  const [redirect, setRedirect] = React.useState(false);
  const [location, setLocation] = React.useState();
  const [description, setDescription] = React.useState();
  const [meetingId, setMeetingId] = React.useState();
  const [meetingPage, setMeetingPage] = React.useState();
  const server = axios.create({
    baseURL: serverURL,
  });

  function createNewMeeting() {
    const newMeeting = {
      meeting_id: '1',
      title: title,
      description: description,
      location: location,
      members: [],
    };
    server.post('/meeting', JSON.stringify(newMeeting))
      .then(response => {
        const meeting_id: string = response.data.meeting_id;
        console.log(response);
        console.log(response.data.meeting_id);
        setMeetingId(meeting_id);
      });
  }

  function titleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function locationHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }

  function descriptionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }


  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createNewMeeting();
    setMeetingPage('/meeting/'+meetingId);
    setRedirect(true);
    redirectHandler();
  }
  function redirectHandler() {
    if (redirect) {
      props.history.push('/meeting/'+meetingId);
    }
  }
  
  const classes = useStyles();
  return (
    <div className="MeetingForm">
    <HeaderBar />
    <form onSubmit={onSubmit}>
        <div className={classes.root}>
          <Typography variant="h3" gutterBottom >
            Create Meeting
          </Typography>
          <Paper className={classes.paper}>
          
              
                <AddTitle titleHandler={titleHandler}/>
              
            
              
                <AddDescription descriptionHandler={descriptionHandler}/>
              
            
              
                <AddLocation locationHandler={locationHandler}/>
             
           
              
                <Button variant="outlined" type="submit" className={classes.button}>
                  Create Meeting
                </Button>
             
            
          </Paper>
        </div>
      </form>
    </div>
  );
}

export default MeetingForm;