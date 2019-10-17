import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import HeaderBar from '../../components/HeaderBar';
import MeetingDetails from '../../components/MeetingDetails';
import TimeTable from '../../components/TimeTable';
import EnterName from '../../components/EnterName';

import { serverURL } from '../../types/constants';
import { Meeting } from '../../types/Meeting';
import { Member } from '../../types/Member';
import { Day } from '../../types/Day';

type TParams =  { meeting_id: string };

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing(12),
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '25%',
    transform: 'translate(-50%, -25%)'
  },
  headerSpacing: {
    marginTop: theme.spacing(10),
  },
  paper: {
    textAlign: 'center',
    square: 'true',
    alignItems: 'flex',
    padding: theme.spacing(5),
  },
  reschedule: {
    marginTop: theme.spacing(4),
  }
}));

function MeetingPage({ match }: RouteComponentProps<TParams>) {
  const classes = useStyles();
  const [meeting, setMeeting] = useState(new Meeting());
  const [member, setMember] = useState(new Member());
  const [loadingMeeting, setLoadingMeeting] = useState(true);
  const [loadingMember, setLoadingMember] = useState(true);
  const server = axios.create({
    baseURL: serverURL,
  });
  
  let memberData: Member = member;
  let updatingHours: boolean = false;

  const meeting_id: string = match.params.meeting_id;

  function componentDidMount() {
    if (typeof meeting_id !== 'undefined') {
      // Get the meeting by meeting_id
      server.get('/meeting?meeting_id=' + meeting_id)
        .then(response => {
          const meet = response.data.Item;
          // Get the members by meeting_id
          server.get('/member?meeting_id=' + meeting_id)
            .then(response => {
              const memberList = response.data.members;
              const members: Member[] = [];

              for (let i = 0; i < memberList.length; i++ ) {
                const mem = memberList[i];
                const addMember = new Member(meeting_id, mem.member_id, mem.name);
                const days: Day[] = [];

                for (let j = 0; j < mem.days.length; j++) {
                  days.push(new Day(mem.days[j].name, mem.days[j].hours));
                }

                addMember.days = days;
                members.push(addMember);
              }

              setMeeting(new Meeting(
                meet.meeting_id, meet.title, meet.description, meet.location, members,
                meet.selectedTime, meet.url
              ));
              setLoadingMeeting(false);
            })
        });
      
      const member_id: string | null = localStorage.getItem(`meetingId:${meeting_id}`);
      if (member_id !== null) {
        // Get the current member
        server.get('/member?meeting_id=' + meeting_id + '&member_id=' + member_id)
        .then(response => {
            const m = response.data;
            const days: Day[] = [];

            for (let i = 0; i < m.days.length; i++) {
              days.push(new Day(m.days[i].name, m.days[i].hours));
            }

            memberData = new Member(meeting_id, m.member_id, m.name, days);
            
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
    if (typeof meeting_id !== 'undefined') {
      const newMember: Member = new Member(meeting_id, '1', name);

      // Create new User
      server.post('/member?meeting_id=' + meeting_id, JSON.stringify(newMember))
        .then(response => {
          const member_id: string = response.data.member_id;

          localStorage.setItem(`meetingId:${meeting_id}`, member_id);
          memberData = new Member(meeting_id, member_id, name);
          setMember(memberData);
        });
    }
  }

  function wait() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }

  function updateTimes(day: string, index: number) {
    const newHours: Day[] = memberData.days;

    for (let i = 0; i < newHours.length; i++) {
      const d: Day = newHours[i];
      if (d.name === day) {
        newHours[i].hours[index] = !newHours[i].hours[index];
      }
    }

    if (!updatingHours) {
      updatingHours = true;
      wait().then(() => {
        updatingHours = false;

        const member_id: string | null = localStorage.getItem(`meetingId:${meeting_id}`)
        if (member_id !== null) {
          server.put(`/member?meeting_id=` + meeting_id + '&member_id=' + member_id, JSON.stringify(memberData));
        }
      });
    }
  }

  function selectTime(time: string) {
    const newMeeting: Meeting = new Meeting(meeting.meeting_id, meeting.title,
      meeting.description, meeting.location, meeting.members, time, meeting.url);

    server.put('/meeting?meeting_id=' + meeting_id, JSON.stringify(newMeeting))
      .then(() => {
        setMeeting(newMeeting);
      })
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
          <CircularProgress className={classes.headerSpacing}/>
        </Grid>
      </div>
    );
  }

  if (meeting.selectedTime !== 'none') {
    return (
      <div className="MeetingPage">
        <HeaderBar />
        {member.member_id === '' &&
        <EnterName createNewUser={(name: string) => createNewUser(name)} />
        }
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <MeetingDetails meeting={meeting} />
            <Button className={classes.reschedule} color="secondary" onClick={() => selectTime('none')}>
              Reschedule
            </Button>
          </Paper>
        </div>
      </div>
    )
  }

  return (
    <div className="MeetingPage">
      <HeaderBar isMeetingPage meetingId={meeting.meeting_id} />
      {member.member_id === '' &&
        <EnterName createNewUser={(name: string) => createNewUser(name)} />
      }
      <MeetingDetails meeting={meeting} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6}>
          <TimeTable
            meeting={meeting}
            member={member}
            updateTimes={updateTimes}
            selectTime={selectTime}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <TimeTable
            meeting={meeting}
            member={member}
            isGroupTable
            updateTimes={updateTimes}
            selectTime={selectTime}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default MeetingPage;
