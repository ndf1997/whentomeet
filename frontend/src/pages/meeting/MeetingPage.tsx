import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HeaderBar from '../../components/HeaderBar';
import MeetingDetails from '../../components/MeetingDetails';
import TimeTable from '../../components/TimeTable';
import EnterName from '../../components/EnterName';

import { serverURL } from '../../types/constants';
import { Meeting } from '../../types/Meeting';
import { Member } from '../../types/Member';

type TParams =  { meetingId: string };

function MeetingPage({ match }: RouteComponentProps<TParams>) {
  const [meeting, setMeeting] = useState(new Meeting());
  const server = axios.create({
    baseURL: serverURL,
  });

  const meetingId = match.params.meetingId;

  function componentDidMount() {
    if (typeof meetingId !== 'undefined') {
      server.get('/meeting?meeting_id=' + meetingId)
        .then(response => {
          const m = response.data.Item;
          setMeeting(new Meeting(
            m.meeting_id, m.title, m.description, m.location, []
          ));
        })
    }
  }
  useEffect(() => componentDidMount(), [])

  function createNewUser(name: string) {
    const member: Member = new Member('', name, []);
    if (typeof meetingId !== 'undefined') {
      console.log(JSON.stringify(member));
      // TODO send new user to server
      // server.post('/member?meeting_id=' + meetingId)
    }
  }

  return (
    <div className="MeetingPage">
      <HeaderBar />
      <EnterName createNewUser={(name: string) => createNewUser(name)} />
      <MeetingDetails meeting={meeting} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TimeTable meeting={meeting} />
        </Grid>
        <Grid item xs={6}>
          <TimeTable meeting={meeting} isGroupTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default MeetingPage;
