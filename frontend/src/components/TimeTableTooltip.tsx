import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { Member } from '../types/Member';

const useStyles = makeStyles(() => createStyles({
  text: {
    fontSize: 14,
  }
}));

function TimeTableTooltip (props: InferProps<typeof TimeTableTooltip.propTypes>) {
  const { children, day, time, members, percentage } = props;

  const classes = useStyles();

  return (
    <Tooltip placement="top" title={
      <React.Fragment>
        <Typography className={classes.text} align="center" variant="h6" gutterBottom>
          {`${day}, ${time}`}
        </Typography>
        <Typography className={classes.text} align="center" gutterBottom>
          {`Availability: ${percentage}`}
        </Typography>
        {members.map((member: Member) => (
          <Typography key={member.member_id} className={classes.text} align="center">
            {member.name}
          </Typography>))
        }
      </React.Fragment>
      }
    >
      {children}
    </Tooltip>
  )
}

TimeTableTooltip.propTypes = {
  day: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  time: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default TimeTableTooltip;