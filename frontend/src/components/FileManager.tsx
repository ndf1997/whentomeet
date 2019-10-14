import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes, { InferProps, string } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import UploadFiles from './UploadFiles';
import FileList from './FileList';

import { serverURL } from '../types/constants';
import { File, testFiles } from '../types/File';

function FileManager(props: InferProps<typeof FileManager.propTypes>) {
  const { open, closeFileDialog, meetingId } = props;
  const emptyFileList: File[] = [];
  const [files, setFiles] = useState(emptyFileList);
  const server = axios.create({
    baseURL: serverURL,
  });

  function getFiles() {
    server.get('/files?meeting_id=' + meetingId)
      .then(response => {
        console.log(response);
      })
  }
  useEffect(() => getFiles(), [])

  return (
    <Dialog
      onClose={() => closeFileDialog()}
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>File Manager</DialogTitle>
      <DialogContent dividers>
        <FileList files={testFiles} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeFileDialog()}>
          Cancel
        </Button>
        <UploadFiles meetingId={meetingId} />
      </DialogActions>
    </Dialog>
  )
}

FileManager.propTypes = {
  closeFileDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  meetingId: string,
};

export default FileManager;