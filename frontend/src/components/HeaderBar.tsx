import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PropTypes, {InferProps} from 'prop-types';


const useStyles = makeStyles((theme: Theme) => createStyles({
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

function HeaderBar(props: InferProps<typeof HeaderBar.propTypes>) {
  const classes = useStyles();
  let link;
  if (typeof props.meetingId !== 'undefined') {
    link = <Link to="/create">
      <Typography variant="h6" className={classes.title}>
      Edit Meeting</Typography>
    </Link>
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <MeetingRoomIcon className={classes.meetingIcon} />
          <Typography variant="h6" className={classes.title}>
            WhenToMeet
          </Typography>
          {link}
        </ToolBar>
      </AppBar>
    </div>
  )
}

HeaderBar.propTypes = {
  meetingId: PropTypes.string,
}

export default HeaderBar;