import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import container from '@material-ui/core/Container';
import AddTitle from '../../components/AddTitle';
import AddDescription from '../../components/AddDescription';
import AddLocation from '../../components/AddLocation';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, RouteComponentProps, Redirect } from 'react-router-dom';
import { serverURL } from '../../types/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    backgroundColor: '#e0e0e0',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

type TParams = { meetingId: string };



function MeetingForm({match}: RouteComponentProps<TParams>) {
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
    return <Redirect to='/'/>
  }
  const classes = useStyles();
  return (
    <form onSubmit={onSubmit}>
        <div className="container">
            <AddTitle titleHandler={titleHandler}/>
            <AddDescription descriptionHandler={descriptionHandler}/>
            <AddLocation locationHandler={locationHandler}/>
        </div>
        <Button variant="outlined" type="submit">
          Create Meeting
        </Button>
          
    </form>
  );
}

export default MeetingForm;