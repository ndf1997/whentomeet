import React, { useState } from 'react';
import axios from 'axios';
import PropTypes, { InferProps } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddTitle from './AddTitle';
import AddDescription from './AddDescription';
import AddLocation from './AddLocation';
import { serverURL } from '../types/constants';
import { Meeting } from '../types/Meeting';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      marginLeft: theme.spacing(1),
    },
    textField: {
      width: '90%'
      
    }
  }));
function EditMeeting(props: InferProps<typeof EditMeeting.propTypes>) {
    const classes = useStyles();
    const [title, setTitle] = React.useState(props.existingTitle);
    const [redirect, setRedirect] = React.useState(false);
    const [location, setLocation] = React.useState(props.existingLocation);
    const [description, setDescription] = React.useState(props.existingDescription);
    const [open, setOpen] = useState(false);
    const server = axios.create({
        baseURL: serverURL,
    });

    function titleEdit(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function descriptionEdit(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function locationEdit(event: React.ChangeEvent<HTMLInputElement>) {
        setLocation(event.target.value);
    }

    function submitEdit() {
        const editMeeting = {
            meeting_id: props.meeting_id,
            title: title,
            description: description,
            location: location,
        };
        server.put('/meeting', JSON.stringify(editMeeting))
            .then(response => {
                props.titleHandler(title);
                props.locationHandler(location);
                props.descriptionHandler(description);
                props.editHandler();
            });
    }
    
    return (
        <Dialog
          open={props.open}
          
          >
              <DialogTitle>Edit Meeting</DialogTitle>
              <DialogContent>
                  <TextField 
                    id="title"
                    value={title}
                    className={classes.textField}
                    onChange={titleEdit}
                    label="Meeting Name"
                    margin="normal"
                    variant="filled"
                    required/>
                  <TextField
                    id="description"
                    value={description}
                    className={classes.textField}
                    onChange={descriptionEdit}
                    label="Description"
                    multiline={true}
                    inputProps={{maxLength:500}}
                    margin="normal"
                    variant="filled"
                    required
                    />
                  <TextField
                    id="location"
                    value={location}
                    onChange={locationEdit}
                    className={classes.textField}
                    label="Location"
                    margin="normal"
                    variant="filled"
                    required
                    />
              </DialogContent>
            <DialogActions>
                <Button onClick={() => submitEdit()} color="primary">
                    Edit Meeting
                </Button>
            </DialogActions>
          </Dialog>
    )
    
}

EditMeeting.propTypes = {
    meeting_id: PropTypes.string.isRequired,
    titleHandler: PropTypes.func.isRequired,
    descriptionHandler: PropTypes.func.isRequired,
    locationHandler: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    editHandler: PropTypes.func.isRequired,
    existingTitle: PropTypes.string.isRequired,
    existingDescription: PropTypes.string.isRequired,
    existingLocation: PropTypes.string.isRequired,
}

export default EditMeeting;