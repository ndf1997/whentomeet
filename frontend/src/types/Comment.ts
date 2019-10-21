import PropTypes from 'prop-types';

export class Comment {
  author: string;
  text: string;

    constructor(author: string = '', text: string = ''){
        this.author = author;
        this.text = text;
    }
}

export const CommentPropType = PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
})