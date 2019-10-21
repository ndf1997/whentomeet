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
import { Comment } from '../../types/Comment';
import CommentSection from '../../components/CommentSection';
import TextField from '@material-ui/core/TextField';

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
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function MeetingPage({ match }: RouteComponentProps<TParams>) {
  const classes = useStyles();
  const [meeting, setMeeting] = useState(new Meeting());
  const [member, setMember] = useState(new Member());
  const [loadingMeeting, setLoadingMeeting] = useState(true);
  const [loadingMember, setLoadingMember] = useState(true);
  const comm: Comment[] = [];
  const [CommentList,setCommentList] = useState(comm);
  const [post,setPost] = useState('');
  const server = axios.create({
    baseURL: serverURL,
  });
  const ws = new WebSocket('wss://4q2r9vhqc6.execute-api.us-east-2.amazonaws.com/dev');
  
  let memberData: Member = member;
  let updatingHours: boolean = false;

  const meeting_id: string =  match.params.meeting_id;
  //const meeting_id: string = '32nfcA2-';
  function componentDidMount() {
    const connect = {
      action: "addMeeting",
      meeting_id: meeting_id
    };
    ws.onopen = message => {
      ws.send(JSON.stringify(connect));
    }
    ws.onmessage = evt => {
      var str = evt.data;
      str = str.substring(5);
      var temp = JSON.parse(str);
      console.log(temp);
      const newMeeting: Meeting = new Meeting(temp.meeting_id, temp.title,
        temp.description, temp.location, temp.members, temp.time, temp.url, temp.creatorId);
      console.log(newMeeting);
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
              const comments: Comment[] = [];
              const ComList = meet.commentlist;
              if (typeof ComList !== 'undefined'){
                for (let i = 0; i < ComList.length; i++ ) {
                  const c = ComList[i];
                  comments[i] = c;
                }
              }
              setMeeting(new Meeting(
                meet.meeting_id, meet.title, meet.description, meet.location, members,
                meet.selectedTime, meet.url, comments, meet.poll, meet.creatorId
              ));
              setLoadingMeeting(false);
              
            })
        });
    }
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
                meet.selectedTime, meet.url, meet.commentlist, meet.poll, meet.creatorId
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
          console.log(response.data);

          localStorage.setItem(`meetingId:${meeting_id}`, member_id);
          memberData = new Member(meeting_id, member_id, name);
          console.log(memberData);
          setMember(memberData);
          if (meeting.creatorId == "none") {
            server.get('/meeting?meeting_id=' + meeting_id).then(response=>{
              const meet = response.data.Item;
              meet.creatorId = member_id;
              server.put('/meeting?meeting_id=' + meeting_id, JSON.stringify(meet))
            .then(response => { 
              setMeeting(meet);
              const update = {
                action: "onUpdate",
                message: meet
              };
            })});
          }
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
    console.log(day);
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
          console.log("here");
          server.put('/member?meeting_id=' + meeting_id + '&member_id=' + member_id, JSON.stringify(memberData)).then((response )=> {
            console.log(response);
            const update = {
              action: "onUpdate",
              message: meeting
            };
            ws.send(JSON.stringify(update));});
        }
      });
    }
  }

  function selectTime(time: string) {
    const newMeeting: Meeting = new Meeting(meeting.meeting_id, meeting.title,
      meeting.description, meeting.location, meeting.members, time, meeting.url, meeting.commentlist, meeting.poll, meeting.creatorId);

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
            <MeetingDetails meeting={meeting} member={member}/>
            <Button className={classes.reschedule} color="secondary" onClick={() => selectTime('none')}>
              Reschedule
            </Button>
          </Paper>
        </div>
      </div>
    )
  }

/* Comment Section */

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
      setPost(event.target.value);
    }
    function HandlePost(){
      var newPost = { author: member.name, text: post };
      var temp1 = [...meeting.commentlist];
      var temp = temp1.concat(newPost);
      setCommentList(temp);
      meeting.commentlist = temp;

      server.put('/meeting?meeting_id=' + meeting_id, JSON.stringify(meeting))
        .then(response => {
            console.log(response);
        });
    }

  return (
    <div className="MeetingPage">
      <HeaderBar isMeetingPage meetingId={meeting.meeting_id} />
      {member.member_id === '' &&
        <EnterName createNewUser={(name: string) => createNewUser(name)} />
      }
      <MeetingDetails meeting={meeting} member={member}/>
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
      <div style={{ position: 'fixed', bottom: '0', display: 'flex', width: '60%'}}>
                                    <TextField
                                        id="standard-full-width"
                                        onChange={handleChange}
                                        value={post}
                                        label="Add a Comment"
                                        style={{ margin: 8, width: '80%' }}
                                        placeholder="Say Something"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true
                                        }}
                                    /> 
                                    <Button variant="contained" color="primary" className={classes.button} onClick={HandlePost}>
                                            Post
                                    </Button>  
                                </div>
      <CommentSection commentList={meeting.commentlist} />
    </div>
  );
}


export default MeetingPage;
