import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HeaderBar from '../../components/HeaderBar';
import MeetingDetails from '../../components/MeetingDetails';
import TimeTable from '../../components/TimeTable';

import { serverURL } from '../../types/constants';
import { Meeting } from '../../types/Meeting';

type TParams =  { meetingId: string };

function MeetingPage({ match }: RouteComponentProps<TParams>) {
  const [meeting, setMeeting] = useState(new Meeting());
  function componentDidMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const meetingId = match.params.meetingId;

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

  return (
    <div className="MeetingPage">
      <HeaderBar />
      <MeetingDetails meeting={meeting} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TimeTable />
        </Grid>
        <Grid item xs={6}>
          <TimeTable isGroupTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default MeetingPage;
