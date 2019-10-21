import TextField from '@material-ui/core/TextField';
import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Button from '@material-ui/core/Button';

function CommentPane(props: InferProps<typeof CommentPane.propTypes>){
    const [comment, setComment] = React.useState('');

    function commentEdit(event: React.ChangeEvent<HTMLInputElement>) {
        setComment(event.target.value);
        console.log(comment);
    }

    function postComment() {
        props.commentHandler(comment);
        props.handlePost(comment);
        setComment('');
    }

    return(
        <div style={{ position: 'fixed', bottom: '0', display: 'flex', width: '60%'}}>
            <TextField
                id="standard-full-width"
                onChange={commentEdit}
                value={comment}
                label="Add a Comment"
                style={{ margin: 8, width: '80%' }}
                placeholder="Say Something"
                margin="normal"
                InputLabelProps={{
                    shrink: true
                }}
            /> 
            <Button variant="contained" color="primary" onClick={() => postComment()}>
                Post
            </Button>  
        </div>
    )
}

CommentPane.propTypes = {
    commentHandler: PropTypes.func.isRequired,
    handlePost: PropTypes.func.isRequired,
}

export default CommentPane;