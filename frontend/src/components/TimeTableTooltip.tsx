import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { Member } from '../types/Member';

function TimeTableTooltip (props: InferProps<typeof TimeTableTooltip.propTypes>) {
  const { children, day, time, members, percentage } = props;
  return (
    <Tooltip placement="top" title={
      <React.Fragment>
        <Typography variant="h6" gutterBottom>{`${day}, ${time}`}</Typography>
        <Typography gutterBottom>{`Availability: ${percentage}`}</Typography>
        {members.map((member: Member) => <Typography>{member.name}</Typography>)}
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