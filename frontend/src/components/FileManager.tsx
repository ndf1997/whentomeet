import React from 'react';
import PropTypes, { InferProps, string } from 'prop-types';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import UploadFiles from './UploadFiles';
import FileList from './FileList';

import { testFiles } from '../types/File';

function FileManager(props: InferProps<typeof FileManager.propTypes>) {
  const { open, closeFileDialog, meetingId } = props;

  return (
    <Dialog
      onClose={() => closeFileDialog()}
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>File Manager</DialogTitle>
      <DialogContent>
        <FileList files={testFiles} />
        <UploadFiles meetingId={meetingId} />
      </DialogContent>
    </Dialog>
  )
}

FileManager.propTypes = {
  closeFileDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  meetingId: string,
};

export default FileManager;