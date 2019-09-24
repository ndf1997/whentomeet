import PropTypes from 'prop-types';
import { Day, DayPropType } from './Day';

import { days as d } from './constants';

export class Member {
  memberId: string;
  name: string;
  days: Day[];

  constructor(memberId: string = '', name: string = '', days: Day[] = []) {
    this.memberId = memberId;
    this.name = name;
    this.days = days;
    if (days.length === 0) {
      this.days = d.map(day => new Day(day));
    }
  }
}

export const MemberPropType = PropTypes.shape({
  memberId: PropTypes.string,
  name: PropTypes.string,
  hours: PropTypes.arrayOf(DayPropType),
});