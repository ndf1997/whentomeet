import React from 'react';
import { InferProps } from 'prop-types';
import { mount, shallow } from 'enzyme';
import TableCell from '@material-ui/core/TableCell';
import TimeTableCell from '../components/TimeTableCell';

import { Member } from '../types/Member';

describe('TimeTableCell tests', () => {
  let day: string;
  let index: number;
  let member: Member;
  let updateTimes: jest.Mock;
  let props: InferProps<typeof TimeTableCell.propTypes>;

  beforeAll(() => {
    day = 'Wednesday';
    index = 2;
    updateTimes = jest.fn();
    member = new Member('1234', '1', 'Nick');
    member.days[3].hours[3] = true;
    props = {
      day, 
      index,
      member,
      updateTimes,
    }
  });

  it('should render a table cell', () => {
    const timeTableCell = mount(<table><tbody><tr><TimeTableCell {...props} /></tr></tbody></table>);
    const tableCell = timeTableCell.find(TableCell);
    expect(tableCell.length).toEqual(1);
  });

  it('should render an empty time cell for unselected times', () => {
    const timeTableCell = mount(<table><tbody><tr><TimeTableCell {...props} /></tr></tbody></table>);
    const tableCell = timeTableCell.find(TableCell);
    const cellClassName = tableCell.props().className;
    if (cellClassName === undefined) {
      fail('table cell has no class name');
    } else {
      expect(cellClassName.includes('selected')).toEqual(false);
    }
  });

  it('should render a filled time cell for selected times', () => {
    index = 3;
    props.index = index;
    const timeTableCell = mount(<table><tbody><tr><TimeTableCell {...props} /></tr></tbody></table>);
    const tableCell = timeTableCell.find(TableCell);
    const cellClassName = tableCell.props().className;
    if (cellClassName === undefined) {
      fail('table cell has no class name');
    } else {
      expect(cellClassName.includes('selected')).toEqual(true);
    }
  });

  it('should call updateTimes when clicked', () => {
    const timeTableCell = mount(<table><tbody><tr><TimeTableCell {...props} /></tr></tbody></table>);
    const tableCell = timeTableCell.find(TableCell);
    tableCell.simulate('mouseDown');
    expect(updateTimes).toBeCalledWith(day, index);    
  });

  it('should toggle selected when clicked', () => {
    const timeTableCell = mount(<table><tbody><tr><TimeTableCell {...props} /></tr></tbody></table>);
    const tableCell = timeTableCell.find(TableCell);
    let cellClassName = tableCell.props().className;
    if (cellClassName === undefined) {
      fail('table cell has no class name');
    } else {
      expect(cellClassName.includes('selected')).toEqual(true);
    }
    tableCell.simulate('mouseDown');
    cellClassName = timeTableCell.find(TableCell).props().className;
    if (cellClassName === undefined) {
      fail('table cell has no class name');
    } else {
      expect(cellClassName.includes('selected')).toEqual(false);
    }
  })
});