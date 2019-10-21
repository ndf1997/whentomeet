import PropTypes from 'prop-types';

export class Answer {
  value: string;
  counter: number;
  id: number;
  selected: boolean;

    constructor(value: string = '', counter: number = 0, id: number, selected: false){
        this.value = value;
        this.counter = counter;
        this.id = id;
        this.selected = selected;
    }
}

export const AnswerPropType = PropTypes.shape({
    value: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired
})