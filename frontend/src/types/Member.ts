import PropTypes from 'prop-types';
import { Day, DayPropType } from './Day';

export class Member {
  memberId: string;
  name: string;
  days: Day[];

  constructor(memberId: string = '', name: string = '', days: Day[] = []) {
    this.memberId = memberId;
    this.name = name;
    this.days = days;
  }
}

export const MemberPropType = PropTypes.shape({
  memberId: PropTypes.string,
  name: PropTypes.string,
  hours: PropTypes.arrayOf(DayPropType),
});