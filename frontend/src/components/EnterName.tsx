import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

function EnterName(props: InferProps<typeof EnterName.propTypes>) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');

  function textHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function checkName() {
    if (name !== '') {
      props.createNewUser(name);
      setOpen(false);
    }
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
    >
      <DialogTitle>Enter Name</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          value={name}
          label="Name"
          onChange={textHandler}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => checkName()} color="primary">
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EnterName.propTypes = {
  createNewUser: PropTypes.func.isRequired,
}

export default EnterName;