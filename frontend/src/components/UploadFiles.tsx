import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Dialog, DialogTitle } from '@material-ui/core';

function UploadFiles(props: InferProps<typeof UploadFiles.propTypes>) {
  return (
    <Dialog
      onClose={() => props.closeFileDialog()}
      open={props.open}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>FileManager</DialogTitle>
    </Dialog>
  )
}

UploadFiles.propTypes = {
  closeFileDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UploadFiles;