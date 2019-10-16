import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import { FilePropType } from '../types/File';

function FileList(props: InferProps<typeof FileList.propTypes>) {
  return (
    <div>
      <List>
        {props.files.map(file => (
          <ListItem key={file.filename}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <Link href={file.url} color="inherit" target="_blank" rel="noopener">
              {file.filename}
            </Link>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => props.deleteFile(file.filename)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.arrayOf(FilePropType.isRequired).isRequired,
  deleteFile: PropTypes.func.isRequired,
}

export default FileList;