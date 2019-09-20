import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes, {InferProps} from 'prop-types';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
  }
}));

function AddLocation(props: InferProps<typeof AddLocation.propTypes>) {
  const classes = useStyles();
  const [name, setName] = React.useState('');

  

  return (
    <div>
      <TextField
        id="location"
        className={classes.textField}
        value={name}
        label="Location"
        onChange={props.locationHandler}
        margin="normal"
        variant="filled"
      />
    </div>
  );
}

AddLocation.propTypes = {
  locationHandler: PropTypes.func.isRequired,
}
export default AddLocation;