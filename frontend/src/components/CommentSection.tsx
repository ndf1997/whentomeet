import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Comment from './Comment';
import PropTypes, { InferProps } from 'prop-types';
// import Axios from 'axios';
// import { serverURL } from './../types/constants';


// const useStyles = makeStyles(theme => ({
//     button: {
//       margin: theme.spacing(1),
//     },
//     input: {
//       display: 'none',
//     },
//   }));

function CommentSection(props: InferProps<typeof CommentSection.propTypes>){
    const {commentList} = props; 
    console.log({commentList});
    //const classes = useStyles();
    // const server = Axios.create({
    //   baseURL: serverURL,
    // });

   
    // const [CommentList,setCommentList] = useState(commentList);
    // const [post,setPost] = useState('');


    //   function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    //     setPost(event.target.value);
    //   }


    //   function HandlePost(){
    //     var newPost = { author: "John Doe", text: post };
    //     var temp1 = [...CommentList];
    //     var temp = temp1.concat(newPost);
    //     setCommentList(temp);

    //     server.post('/meeting?meeting_id=' + {meetingId}, JSON.stringify(commentList))
    //       .then(response => {
    //           console.log(response);
    //       });
    //   }
      
    // var data = [
    //     {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //     {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    //     {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //     {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    //     {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //     {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    //     {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //     {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    //     {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //     {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    //     {id: 1, author: "Pete Hunt", text: "This is one comment"},
    //     {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
    //   ];
    return (
        <div>
                <React.Fragment>
                    <CssBaseline />
                        <Container fixed style={{overflow: 'scroll', height:'600px'}}>
                            <Typography component="div" style={{ backgroundColor: '#ADD8E6' }}>
                                
                                {commentList.map(comment => (
                                    <Comment
                                        value={comment.text}
                                        author={comment.author}
                                    />
                                ))}    
                                
                                {/* <div style={{ position: 'fixed', bottom: '0', display: 'flex', width: '60%'}}>
                                    <TextField
                                        id="standard-full-width"
                                        onChange={handleChange}
                                        value={post}
                                        label="Add a Comment"
                                        style={{ margin: 8, width: '80%' }}
                                        placeholder="Say Something"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true
                                        }}
                                    /> 
                                    <Button variant="contained" color="primary" className={classes.button} onClick={HandlePost}>
                                            Post
                                    </Button>  
                                </div> */}
                            </Typography>
                        </Container>
                </React.Fragment>     
     </div>
    );
}

CommentSection.propTypes = {
  commentList: PropTypes.array.isRequired,
  //meetingId: PropTypes.string.isRequired
}

export default CommentSection;