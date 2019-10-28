import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes, { InferProps } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import UploadFiles from './UploadFiles';
import FileList from './FileList';

import { serverURL } from '../types/constants';
import { File } from '../types/File';

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
        const newFileList: File[] = [];
        const f = response.data.files;
        for(let i = 0;i < f.length;i++) {
          newFileList.push(new File(f[i].filename, f[i].url));
        }
        setFiles(newFileList);
      })
  }
  useEffect(() => getFiles(), []);

  function deleteFile(filename: string) {
    server.delete(`/files?meeting_id=` + meetingId + '&filename=' + filename)
      .then(() => getFiles());
  }

  return (
    <Dialog
      onClose={() => closeFileDialog()}
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>File Manager</DialogTitle>
      <DialogContent dividers>
        <FileList files={files} deleteFile={deleteFile} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeFileDialog()}>
          Cancel
        </Button>
        <UploadFiles meetingId={meetingId} getFiles={getFiles} />
      </DialogActions>
    </Dialog>
  )
}

FileManager.propTypes = {
  closeFileDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  meetingId: PropTypes.string,
};

export default FileManager;