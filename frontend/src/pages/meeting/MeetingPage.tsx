import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import HeaderBar from '../../components/HeaderBar';
import MeetingDetails from '../../components/MeetingDetails';
import TimeTable from '../../components/TimeTable';
import EnterName from '../../components/EnterName';

import { serverURL } from '../../types/constants';
import { Meeting } from '../../types/Meeting';
import { Member } from '../../types/Member';
import { Day } from '../../types/Day';

type TParams =  { meetingId: string };

function MeetingPage({ match }: RouteComponentProps<TParams>) {
  const [meeting, setMeeting] = useState(new Meeting());
  const [member, setMember] = useState(new Member());
  const [loadingMeeting, setLoadingMeeting] = useState(true);
  const [loadingMember, setLoadingMember] = useState(true);
  const server = axios.create({
    baseURL: serverURL,
  });

  let memberData: Member = new Member();

  const meetingId: string = match.params.meetingId;

  function componentDidMount() {
    if (typeof meetingId !== 'undefined') {
      server.get('/meeting?meeting_id=' + meetingId)
        .then(response => {
          const m = response.data.Item;
          setMeeting(new Meeting(
            m.meeting_id, m.title, m.description, m.location, []
          ));
          setLoadingMeeting(false);
        });
      
      const memberId: string | null = localStorage.getItem(`meetingId:${meetingId}`)
      if (memberId !== null) {
        server.get('/member?member_id=' + memberId)
          .then(response => {
            const m = response.data.Item;
            memberData = new Member(
              m.member_id, m.member_name
            );
            setMember(memberData);
            setLoadingMember(false);
          });
      } else {
        setLoadingMember(false);
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
          memberData = new Member(memberId, name);
          setMember(memberData);
        });
    }
  }

  function updateTimes(day: string, index: number) {
    const newHours: Day[] = memberData.days;

    for (let i = 0; i < newHours.length; i++) {
      const d: Day = newHours[i];
      if (d.name === day) {
        newHours[i].hours[index] = !newHours[i].hours[index];
      }
    }
  }

  if (loadingMeeting || loadingMember) {
    return (
      <div className="MeetingPage">
        <HeaderBar />
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <CircularProgress/>
        </Grid>
      </div>
    );
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
          <TimeTable
            meeting={meeting}
            member={member}
            updateTimes={updateTimes}
          />
        </Grid>
        <Grid item xs={6}>
          <TimeTable
            meeting={meeting}
            member={member}
            isGroupTable
            updateTimes={updateTimes}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default MeetingPage;
