import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
  }
}));

function AddLocation() {
  const classes = useStyles();
  const [name, setName] = React.useState('');

  function textHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div>
      <TextField
        id="location"
        className={classes.textField}
        value={name}
        label="Location"
        onChange={textHandler}
        margin="normal"
        variant="filled"
      />
    </div>
  );
}

export default AddLocation;