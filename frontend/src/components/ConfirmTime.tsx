import React, { useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

function ConfirmTime(props: InferProps<typeof ConfirmTime.propTypes>) {
  const [open, setOpen] = React.useState(props.open);
  
  function handleClose(selection: string) {
    setOpen(false);
    props.handleSelection(selection);
  }

  useEffect(() => setOpen(props.open), [props.open])

  return (
    <Dialog open={open} onClose={() => handleClose('none')}>
      <DialogTitle>Confirm Time Selected</DialogTitle>
      <DialogContent>
        Schedule this meeting for {props.day}, {props.time}?
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose('none')}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => handleClose(`${props.day}, ${props.time}`)}>
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmTime.propTypes = {
  open: PropTypes.bool.isRequired,
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
}

export default ConfirmTime;