import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes, {InferProps} from 'prop-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    width: '90%'
    
  }
}));

function AddTitle(props: InferProps<typeof AddTitle.propTypes>) {
  const classes = useStyles();
  const [name, setName] = React.useState('');

  

  return (
    <div>
      <TextField
        id="title"
        className={classes.textField}
        value={props.existingTitle}
        label="Meeting Name"
        onChange={props.titleHandler}
        margin="normal"
        variant="filled"
      />
    </div>
  );
}

AddTitle.propTypes = {
  titleHandler: PropTypes.func.isRequired,
  existingTitle: PropTypes.string,
}
export default AddTitle;