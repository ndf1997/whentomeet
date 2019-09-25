import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddTitle from '../../components/AddTitle';
import AddDescription from '../../components/AddDescription';
import AddLocation from '../../components/AddLocation';
import Button from '@material-ui/core/Button';
import { History, LocationState } from "history";
import {Route, Redirect, withRouter} from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

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
  history: History<LocationState>;
  
}

function MeetingForm(props: MeetingFormProps) {
  const [title, setTitle] = React.useState();
  const [location, setLocation] = React.useState();
  const [description, setDescription] = React.useState();
  const [redirect, setRedirect] = React.useState(false);
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
    return (<Redirect to='/meeting/1234'/>);
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