import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);
  
function PollingComponent(props: InferProps<typeof PollingComponent.propTypes>) {
  const classes = useStyles();
  const { count, value, onIncrement, totalMem} = props;

    return (
      <div>
          <div style={{ display: 'flex'}}>
            <Button color="primary" size="large" className={classes.button} onClick={() => onIncrement(value)}>
              {value}
            </Button>
            <Typography variant="subtitle1" align="right" style={{ paddingTop: '15px', margin: '0 auto'}}>
              {count} Votes
            </Typography>
          </div>
          <div className={classes.root}>
            <BorderLinearProgress
              style={{ width: '58%' , marginLeft: '30px' }}
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={count/totalMem * 100}
            />
          </div>
      </div>
    );
}

PollingComponent.propTypes = {
  count: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  totalMem: PropTypes.number.isRequired,
}

export default PollingComponent;


