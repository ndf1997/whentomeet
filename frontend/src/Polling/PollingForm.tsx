import React, { useState } from 'react';
import Answertsx from './Answer';
import { makeStyles, createStyles, Theme, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes, {InferProps} from 'prop-types';
import { Poll } from '../types/Poll';
import {Answer} from '../types/Answer';
import {Dialog} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    textField: {
      marginLeft: '30px',
      marginRight: theme.spacing(1),
      width: '500px'
    },
    root: {
      padding: theme.spacing(4, 2),
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function PollingForm(props: InferProps<typeof PollingForm.propTypes>) {
    const classes = useStyles();
    const intialArray: string[] = [' ' , ' '];
    const initialAnswer: Answer[] = [];
    const [Answers, setAnswers] = useState(intialArray);
    const [AnswerArray, setAnswer] = useState(initialAnswer);
    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = useState('');
    function addAnswers() { 
      let ans = '';
      setAnswers([...Answers, ans]);
      setAnswer([...AnswerArray, new Answer(ans, 0, AnswerArray.length)]);
      console.log(AnswerArray);
    };

    function setAnswerInArray(ans: string, id: number) {
      let temp = AnswerArray[id];
      if (typeof temp !=='undefined'){
        temp.value = ans;
        AnswerArray[id] = temp;
      }
      else {
        setAnswer([...AnswerArray, new Answer(ans, 0, AnswerArray.length)]);
        console.log(AnswerArray);
      }
    }

    function sumbitPoll() {
      props.pollHandler(new Poll(question, AnswerArray));
      props.pollCloseHandler();
    }
    
    function questionHandler(event: React.ChangeEvent<HTMLInputElement>) {
      setQuestion(event.target.value);
    }
     
      return (
        <Dialog open={props.open}>
            <Paper className={classes.root}>
              <Typography variant="h6" component="h2" style={{ marginLeft: '30px' }}>
                  Ask your question here
                </Typography>
                <TextField
                  id="outlined-bare"
                  className={classes.textField}
                  // defaultValue="Bare"
                  margin="normal"
                  style={{ marginTop: 'unset' }}
                  variant="outlined"
                  inputProps={{ 'aria-label': 'bare' }}
                  onChange={questionHandler}
                />
                <div style={{ marginTop: '20px'}}>
                <Typography variant="h6" component="h2" style={{ marginLeft: '30px' }}>
                    Ask your choices here
                </Typography >
                <ul style={{ marginTop: 'unset' }} >
                  {Answers.map((ans: string, index) => <Answertsx id={index} setAnswerInArray={setAnswerInArray}/>)}
                </ul>
                </div>
                <div style={{ display: 'inline-flex' , paddingLeft: '40px' }}>
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={addAnswers} >
                        <AddIcon />
                    </Fab>
                  <Typography variant="subtitle1" component="h2" style= {{ paddingTop: '20px' }}>
                                Add More
                  </Typography>
                </div>
                <div style={{ marginLeft: '50px', marginTop: '30px' }}>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className={classes.margin} onClick={sumbitPoll}>
                      Submit Poll
                    </Button>
                  </ThemeProvider>
                </div>
          </Paper>
      </Dialog>
    );    
}

PollingForm.propTypes = {
  pollHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  pollCloseHandler: PropTypes.func.isRequired,
}