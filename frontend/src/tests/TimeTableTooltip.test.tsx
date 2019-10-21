import React from 'react';
import { InferProps } from 'prop-types';
import { mount, shallow } from 'enzyme';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TimeTableTooltip from '../components/TimeTableTooltip';

import { Member } from '../types/Member';

describe('TimeTableTooltip tests', () => {
  let day: string;
  let time: string;
  let percentage: string;
  let children: React.ReactElement;
  let members: Member[];
  let props: InferProps<typeof TimeTableTooltip.propTypes>;

  beforeAll(() => {
    day = 'Wednesday';
    time = '11:30am';
    percentage = '75%';
    children = <div></div>;
    members = [
      new Member('1234', '1', 'Nick'),
      new Member('1234', '2', 'Mihir'),
    ];
    props = {
      day, 
      time,
      percentage,
      children,
      members,
    }
  });

  it('should render tooltip', () => {
    const tooltip = shallow(<TimeTableTooltip {...props} />);
    expect(tooltip.find(Tooltip).length).toEqual(1);
  });

  it('should render correct time and availability', () => {
    const tooltip = mount(<TimeTableTooltip {...props} />);
    const tooltipContent = shallow(<div>{tooltip.find(Tooltip).props().title}</div>);
    const timeString = tooltipContent.find(Typography).first().text();
    expect(timeString).toEqual('Wednesday, 11:30am');
    const availability = tooltipContent.find(Typography).at(1).text();
    expect(availability).toEqual('Availability: 75%');
  });

  it('should render names of available members', () => {
    const tooltip = mount(<TimeTableTooltip {...props} />);
    const tooltipContent = shallow(<div>{tooltip.find(Tooltip).props().title}</div>);
    expect(tooltipContent.find(Typography).at(2).text()).toEqual('Nick');
    expect(tooltipContent.find(Typography).at(3).text()).toEqual('Mihir');
  });
});