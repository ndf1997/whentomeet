import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddTitle from '../../components/AddTitle';
import AddDescription from '../../components/AddDescription';
import AddLocation from '../../components/AddLocation';
import Button from '@material-ui/core/Button';
import { History, LocationState } from "history";
import HeaderBar from '../../components/HeaderBar';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(2),
  },
  paper: {
    textAlign: 'center',
    square: 'true',
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

  function onSubmit() {
    props.history.push('/meeting/1234');
  }
  
  const classes = useStyles();
  return (
    <div className="MeetingForm">
    <HeaderBar />
    <form onSubmit={onSubmit}>
        <div className={classes.root}>
          <Grid container spacing={0} justify="center">
            <Grid item xs={7}>
              <Paper className={classes.paper}>
                <AddTitle titleHandler={titleHandler}/>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <Paper className={classes.paper}>
                <AddDescription descriptionHandler={descriptionHandler}/>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <Paper className={classes.paper}>
                <AddLocation locationHandler={locationHandler}/>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <Paper className={classes.paper}>
                <Button variant="outlined" type="submit" className={classes.button}>
                  Create Meeting
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}

export default MeetingForm;