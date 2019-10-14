import React from 'react';
// @ts-ignore
import S3 from 'aws-s3';
import PropTypes, { InferProps } from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
      const S3Client = new S3(config);
      S3Client.uploadFile(file, file.name.split('.')[0])
        // @ts-ignore
        .then(data => {
          props.getFiles();
        })
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
  getFiles: PropTypes.func.isRequired,
}

export default UploadFiles;