import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Divider from '@material-ui/core/Divider';

function Comment(props: InferProps<typeof Comment.propTypes>){
   const {author, value} = props;
    return(
        <div className="comment" style={{margin: '20px'}}>
            <h2 className="commentAuthor">
                {author}
            </h2>
                {value}
            <Divider />
        </div>
    );
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}

export default Comment;