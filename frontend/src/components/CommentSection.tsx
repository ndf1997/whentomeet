import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Comment from './Comment';
import PropTypes, { InferProps } from 'prop-types';


function CommentSection(props: InferProps<typeof CommentSection.propTypes>){
    const {commentList} = props; 
    console.log({commentList});
    
    if(typeof commentList !== 'undefined'){
        return (
            <div>
                    <React.Fragment>
                        <CssBaseline />
                            <Container fixed style={{overflow: 'scroll', height:'600px', width: '100%'}}>
                                <Typography component="div" style={{ backgroundColor: '#ADD8E6' }}>
                                    
                                    {commentList.map(comment => (
                                        <Comment
                                            value={comment.text}
                                            author={comment.author}
                                        />
                                    ))}    
                                    
                                
                                </Typography>
                            </Container>
                    </React.Fragment>     
        </div>
        );

    } else {
        return (
            <div>

            </div>
        );
    }
}

CommentSection.propTypes = {
  commentList: PropTypes.array.isRequired,
}

export default CommentSection;