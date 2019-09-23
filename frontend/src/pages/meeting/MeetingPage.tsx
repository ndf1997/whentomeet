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
  const [member, setMember] = useState(new Member());
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
      
      const memberId: string | null = localStorage.getItem(`meetingId:${meetingId}`)
      if (memberId !== null) {
        server.get('/member?member_id=' + memberId)
          .then(response => {
            const m = response.data.Item;
            setMember(new Member(
              m.member_id, m.member_name, []
            ));
          })
      }
    }
  }
  useEffect(() => componentDidMount(), [])

  function createNewUser(name: string) {
    if (typeof meetingId !== 'undefined') {
      const newMember = {
        meeting_id: meetingId,
        member_name: name,
      };

      server.post('/member', JSON.stringify(newMember))
        .then(response => {
          const memberId: string = response.data.member_id;

          localStorage.setItem(`meetingId:${meetingId}`, memberId);
          setMember(new Member(memberId, name));
        })
    }
  }

  return (
    <div className="MeetingPage">
      <HeaderBar />
      {member.memberId === '' &&
        <EnterName createNewUser={(name: string) => createNewUser(name)} />
      }
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
