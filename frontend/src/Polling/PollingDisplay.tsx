import React, { useState } from 'react';
import PollingComponent from './PollingComponent';
import PropTypes, {InferProps} from 'prop-types';
import { Poll } from '../types/Poll';
import { serverURL } from '../types/constants';
import axios from 'axios';
import { MemberPropType } from '../types/Member';
import { MeetingPropType } from '../types/Meeting';
import {Answer} from '../types/Answer';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function PollingDisplay(props: InferProps<typeof PollingDisplay.propTypes>){
    const [poll, setPoll] = React.useState(new Poll("none", []));
    const server = axios.create({
        baseURL: serverURL,
    })
    const initialArray: Answer[] = [];

            const answer = props.meeting.poll.answer;
            const question = props.meeting.poll.question;
            console.log(answer);
            if (typeof answer !== 'undefined'){
                for (let i = 0; i < answer.length; i++ ) {
                  const c = answer[i];
                  initialArray[i] = c;
                }
              }

              var memNum = 1;
              const memArr = props.meeting.members;
              if(typeof memArr !== 'undefined') {
                  memNum = memArr.length;
              }


    const [Answers, setAnswers] = useState(initialArray);
    console.log(initialArray);

    function handleIncrement(value: string) {
        const temp = [...Answers];
        const index = temp.findIndex(answer => answer.value === value);
        temp[index].counter++;
        setAnswers(temp);
        console.log('incremented')

        server.put('/meeting?meeting_id=' + props.meeting.meeting_id, JSON.stringify(props.meeting))
        .then(response => {
            console.log(response);
        });

    }
    
    return(
        <Dialog
        open={props.open}
        onClose={props.closePollingDialog}
        >
             <Typography component="div" style={{ backgroundColor: '#ADD8E6' }}>
                 {question}
             </Typography>

            <DialogContent>
            {Answers.map(component => (
                <PollingComponent
                onIncrement={handleIncrement} 
                value={component.value}
                count={component.counter}
                totalMem={memNum}
                />
            ))}
            </DialogContent>  
        </Dialog>
    ); 
}

PollingDisplay.propTypes = {
    open: PropTypes.bool.isRequired,
    closePollingDialog: PropTypes.func.isRequired,
    meeting: MeetingPropType.isRequired,
    member: MemberPropType.isRequired,
}

export default PollingDisplay;
