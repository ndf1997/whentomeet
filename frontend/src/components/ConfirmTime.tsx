import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

function ConfirmTime(props: InferProps<typeof ConfirmTime.propTypes>) {
  return (
    <Dialog open={props.open} onClose={() => props.handleSelection('')}>
      <DialogTitle>Confirm Time Selected</DialogTitle>
      <DialogContent>
        Schedule this meeting for {props.time}?
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.handleSelection('')}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => props.handleSelection('Wednesday, 11:30am')}>
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmTime.propTypes = {
  open: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
}

export default ConfirmTime;