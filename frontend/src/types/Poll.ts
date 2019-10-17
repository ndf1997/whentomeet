import PropTypes from 'prop-types';
import { Answer, AnswerPropType } from './Answer';

export class Poll {
    question: string;
    answer: Answer[];

    constructor(question: string = '', answer: Answer[] = []){
        this.question = question;
        this.answer = answer;
    }
}

export const PollPropType = PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.arrayOf(AnswerPropType.isRequired).isRequired
})