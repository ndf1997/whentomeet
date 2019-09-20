import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes, {InferProps} from 'prop-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    width: "30%",
    marginLeft: theme.spacing(1),
  }
}));

function AddDescription(props: InferProps<typeof AddDescription.propTypes>) {
  const classes = useStyles();
  const [name, setName] = React.useState('');

  return (
    <div>
      <TextField
        id="description"
        className={classes.textField}
        value={name}
        label="Description"
        multiline={true}
        inputProps={{maxLength:500}}
        onChange={props.descriptionHandler}
        margin="normal"
        variant="filled"
        required
      />
    </div>
  );
}

AddDescription.propTypes = {
  descriptionHandler: PropTypes.func.isRequired,
}

export default AddDescription;