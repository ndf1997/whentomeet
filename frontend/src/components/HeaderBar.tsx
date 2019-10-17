import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PropTypes, {InferProps} from 'prop-types';
import FileManager from './FileManager';

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
  const { isMeetingPage, meetingId } = props;
  const classes = useStyles();
  const [openFileDialog, setOpenFileDialog] = React.useState(false);

  function closeFileDialog() {
    setOpenFileDialog(false);
  }

  return (
    <div className={classes.root}>
      {isMeetingPage && <FileManager open={openFileDialog} closeFileDialog={closeFileDialog} meetingId={meetingId} />}
      <AppBar position="fixed">
        <ToolBar>
          <MeetingRoomIcon className={classes.meetingIcon} />
          <Typography variant="h6" className={classes.title}>
            WhenToMeet
          </Typography>
          {isMeetingPage &&
            <Button
              color="inherit"
              onClick={() => setOpenFileDialog(true)}
            >Files</Button>
          }
        </ToolBar>
      </AppBar>
    </div>
  )
}

HeaderBar.propTypes = {
  isMeetingPage: PropTypes.bool,
  meetingId: PropTypes.string,
}

export default HeaderBar;