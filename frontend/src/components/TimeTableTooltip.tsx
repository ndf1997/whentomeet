import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

function TimeTableTooltip (props: InferProps<typeof TimeTableTooltip.propTypes>) {
  const { children } = props;
  return (
    <Tooltip title="test">
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