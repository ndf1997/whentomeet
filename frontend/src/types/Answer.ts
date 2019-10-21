import PropTypes from 'prop-types';

export class Answer {
  value: string;
  counter: number;
  id: number;

    constructor(value: string = '', counter: number = 0, id: number){
        this.value = value;
        this.counter = counter;
        this.id = id;
    }
}

export const AnswerPropType = PropTypes.shape({
    value: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
})