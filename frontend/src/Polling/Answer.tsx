import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import {
    createStyles,
    fade,
    Theme,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
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
  
export default function Answer () {
    const classes = useStyles();
    
    return (
        <div>
             <ThemeProvider theme={theme}>
                <TextField
                    className={classes.margin}
                    label="Enter choice here"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                />
             </ThemeProvider>
           
        </div>
       
    );
}
