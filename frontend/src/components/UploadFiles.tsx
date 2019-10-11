import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// @ts-ignore
import S3FileUpload from 'react-s3';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { bucketName, region, accessKeyId, secretAccessKey } from '../types/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  addIcon: {
    marginRight: theme.spacing(2),
  }
}));

function UploadFiles(props: InferProps<typeof UploadFiles.propTypes>) {
  const classes = useStyles();
  const config = {
    bucketName, 
    dirName: props.meetingId,
    region, 
    accessKeyId, 
    secretAccessKey,
  }

  function uploadFile (files: FileList | null) {
    if (files !== null) {
      const file: File = files[0];
      S3FileUpload.uploadFile(file, config)
        // @ts-ignore
        .then(data => console.log(data))
        // @ts-ignore
        .catch(err => console.log(err));
    }
  }

  return (
    <div>
      <input
        type="file"
        id="file-button"
        style={{ display: 'none' }}
        onChange={event => uploadFile(event.target.files)}
      />
      <label htmlFor="file-button">
        <Button
          variant="contained"
          color="primary"
          component="span"
        >
          <AddIcon className={classes.addIcon}/>
          Upload File
        </Button>
      </label>
    </div>
  )
}

UploadFiles.propTypes = {
  meetingId: PropTypes.string,
}

export default UploadFiles;