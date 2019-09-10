import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  meetingIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HeaderBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <MeetingRoomIcon className={classes.meetingIcon} />
          <Typography variant="h6" className={classes.title}>
            WhenToMeet
          </Typography>
        </ToolBar>
      </AppBar>
    </div>
  )
}

export default HeaderBar;