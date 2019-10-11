import React from 'react';
import PropTypes, { InferProps, string } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UploadFiles from './UploadFiles';

import { MeetingPropType } from '../types/Meeting';

const useStyles = makeStyles((theme: Theme) => createStyles({
  addIcon: {
    marginRight: theme.spacing(2),
  }
}));

function FileManager(props: InferProps<typeof FileManager.propTypes>) {
  const { open, closeFileDialog, meetingId } = props;
  const classes = useStyles();

  return (
    <Dialog
      onClose={() => closeFileDialog()}
      open={open}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>File Manager</DialogTitle>
      <DialogContent>
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