import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Comment from './Comment';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

function CommentSection(){
    const classes = useStyles();
    var data = [
        {id: 1, author: "Jenny Doe", text: "This is one comment"},
        {id: 2, author: "Jane Doe", text: "This is another comment"}
      ];
    const [CommentList,setCommentList] = useState(data);
    const [post,setPost] = useState('');

      function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setPost(event.target.value);
      }

      function HandlePost(){
        var newPost = {id: 3, author: "John Doe", text: post};
        var temp1 = [...CommentList];
        var temp = temp1.concat(newPost);
        setCommentList(temp);
      }
    
    return (
        <div>
                <React.Fragment>
                    <CssBaseline />
                        <Container maxWidth="sm">
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                                <div>
                                {CommentList.map(comment => (
                                    <Comment
                                        value={comment.text}
                                        author={comment.author}
                                    />
                                ))}    
                                </div>
                                <div style={{ position: 'fixed', bottom: '0', display: 'flex', width: '60%'}}>
                                    <TextField
                                        id="standard-full-width"
                                        onChange={handleChange}
                                        value={post}
                                        label="Add a Comment"
                                        style={{ margin: 8, width: '80%' }}
                                        placeholder="Say Something"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    /> 
                                    <Button variant="contained" color="primary" className={classes.button} onClick={HandlePost}>
                                            Post
                                    </Button>  
                                </div>
                            </Typography>
                        </Container>
                </React.Fragment>     
     </div>
    );
}

export default CommentSection;