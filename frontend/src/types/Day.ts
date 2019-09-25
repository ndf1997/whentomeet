import PropTypes from 'prop-types';

import { times } from './constants';

export class Day {
  name: string;
  hours: boolean[];

  constructor(name: string = '', hours: boolean[] = []) {
    this.name = name;
    this.hours = hours;
    if (hours.length === 0) {
      this.hours = new Array(times.length).fill(false);
    }
  }
}

export const DayPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
});