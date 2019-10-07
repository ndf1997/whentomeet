import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => createStyles({
  addIcon: {
    marginRight: theme.spacing(2),
  }
}));

function UploadFiles(props: InferProps<typeof UploadFiles.propTypes>) {
  const classes = useStyles();

  return (
    <Dialog
      onClose={() => props.closeFileDialog()}
      open={props.open}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>FileManager</DialogTitle>
      <DialogContent>
        <Button
          variant="contained"
          color="primary"
        >
          <AddIcon className={classes.addIcon}/>
          Upload File
        </Button>
      </DialogContent>
    </Dialog>
  )
}

UploadFiles.propTypes = {
  closeFileDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UploadFiles;