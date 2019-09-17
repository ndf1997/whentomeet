import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import container from '@material-ui/core/Container';
import AddTitle from '../components/AddTitle';
import AddDescription from '../components/AddDescription';
import AddLocation from '../components/AddLocation';
import Button from '@material-ui/core/Button';

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

function MeetingForm() {
  const classes = useStyles();
  
  return (
    <form>
        <div className="container">
            <AddTitle />
            <AddDescription />
            <AddLocation />
        </div>
        <Button variant="outlined" type="submit">
          Create Meeting
        </Button>
          
    </form>
  );
}

export default MeetingForm;