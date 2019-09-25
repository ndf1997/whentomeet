import React from 'react';
import Background from './meetingHome.jpg';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router-dom';

var sectionStyle = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '700px',
    overflow: 'hidden'
    
  };

  const useStyles = makeStyles(theme => ({
    root:{
      overflow: 'hidden'
    },
    button: {
      margin: theme.spacing(1),

    },
    input: {
      display: 'none',
    },
  }));

function HomePage() {
  const classes = useStyles({});
  const [redirect, setRedirect] = React.useState(false);
  function changeRedirect() {
    setRedirect(true);
  }
  function redirectHandler() {
    if (redirect) {
      return <Redirect to='/create'/>;
    }
  }
  return (
    
    <div style={{ overflow: 'hidden'}} >
    <React.Fragment>
        <CssBaseline />
        <Container fixed >
            <Typography variant="h1" component="div" >
                WhenToMeet
            </Typography>
            <Typography variant="h5" component="div" >
               An amazing way to effectively plan and organize a meeting
            </Typography>
        </Container>
    </React.Fragment>
    {redirectHandler()}
    <body style={ sectionStyle }>
    <Container maxWidth="sm">
    <Button variant="contained" onClick={changeRedirect} 
    color="primary" className={classes.button} style={{margin: '20px', height: '60px', right: '200px'}}>
        Start Planning
        </Button>
    </Container>
    </body>
    </div>
  );
}

export default HomePage;