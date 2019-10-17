import PropTypes from 'prop-types';

export class Answer {
  value: string;
  counter: number;

    constructor(value: string = '', counter: number = 0){
        this.value = value;
        this.counter = counter;
    }
}

export const AnswerPropType = PropTypes.shape({
    value: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
})