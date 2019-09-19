import PropTypes from 'prop-types';

export class Day {
  name: string;
  hours: string[];

  constructor(name: string, hours: string[]) {
    this.name = name;
    this.hours = hours;
  }
}

export const DayPropType = PropTypes.shape({
  name: PropTypes.string,
  hours: PropTypes.arrayOf(PropTypes.string),
});