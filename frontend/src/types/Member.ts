import PropTypes from 'prop-types';
import { Day, DayPropType } from './Day';

import { days as d } from './constants';

export class Member {
  member_id: string;
  name: string;
  days: Day[];
  pollingChoice?: number;

  constructor(member_id: string = '', name: string = '', days: Day[] = []) {
    this.member_id = member_id;
    this.name = name;
    this.days = days;
    if (days.length === 0) {
      this.days = d.map(day => new Day(day));
    }
  }
}

export const MemberPropType = PropTypes.shape({
  member_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(DayPropType.isRequired).isRequired,
});