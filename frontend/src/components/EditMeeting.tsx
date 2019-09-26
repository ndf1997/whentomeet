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

function EditMeeting(props: InferProps<typeof EditMeeting.propTypes>) {
    const [title, setTitle] = React.useState();
    const [redirect, setRedirect] = React.useState(false);
    const [location, setLocation] = React.useState();
    const [description, setDescription] = React.useState();
    const [open, setOpen] = useState(false);
    const server = axios.create({
        baseURL: serverURL,
    });
    function titleHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }
    
    function locationHandler(event: React.ChangeEvent<HTMLInputElement>) {
       setLocation(event.target.value);
    }
    function descriptionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
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
                
            });
    }
    
    return (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          >
              <DialogTitle>Edit Meeting</DialogTitle>
              <DialogContent>
                  <AddTitle titleHandler={titleHandler}/>
                  <AddDescription descriptionHandler={descriptionHandler}/>
                  <AddLocation locationHandler={locationHandler}/>
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}

export default EditMeeting;