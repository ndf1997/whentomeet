import React from 'react';
// @ts-ignore
import S3 from 'aws-s3';
import PropTypes, { InferProps } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import { bucketName, region, accessKeyId, secretAccessKey } from '../types/constants';
import { FilePropType } from '../types/File';

function FileList(props: InferProps<typeof FileList.propTypes>) {
  const config = {
    bucketName, 
    dirName: props.meetingId,
    region, 
    accessKeyId, 
    secretAccessKey,
  }

  function deleteFile (filename: string) {
    const S3Client = new S3(config);
    S3Client.deleteFile(filename)
      // @ts-ignore
      .then(data => {
        console.log(data);
        props.getFiles();
      })
      // @ts-ignore
      .catch(err => console.log(err));
  }

  return (
    <div>
      <List>
        {props.files.map(file => (
          <ListItem>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <Link href={file.url} color="inherit" target="_blank" rel="noopener">
              {file.filename}
            </Link>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => deleteFile(file.filename)} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

FileList.propTypes = {
  meetingId: PropTypes.string,
  files: PropTypes.arrayOf(FilePropType.isRequired).isRequired,
  getFiles: PropTypes.func.isRequired,
}

export default FileList;