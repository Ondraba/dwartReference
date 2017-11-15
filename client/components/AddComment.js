import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {findDOMNode} from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';



const AddComment = (props) => {
        let byInput 
        let bodyInput 

        function clearAll(){
             console.log(bodyInput);
            byInput = ''
            bodyInput = ''
             console.log(bodyInput);
        }

        function handleSubmit(){
            const commentVariables = {
            by: byInput,
            body: bodyInput
            }

            props.mutate({
            variables: {
                by: commentVariables.by,
                body: commentVariables.body,
                contentId: props.contentId
                }
            }).then(clearAll());
        }
        
        return(
            <Paper style={ style.paperStyle} zDepth={1} >
                <div style={style.wrapperStyle}>
                    <h3>Add comment:</h3>
                    <TextField  hintText="Your nickname"   onChange={event =>{
                        byInput = event.target.value
                        }
                    } />
                    <br />
                    <TextField  hintText="Add comment"  fullWidth={true}  value={bodyInput} onChange={event => 
                        { bodyInput = event.target.value}
                    } />
                    <br />
                    <RaisedButton label="Komentovat" secondary={true} onClick={handleSubmit.bind(this)}/> 
                </div>
            </Paper>
        )
}

const style = {
  wrapperStyle: {
    paddingTop: 15,
  },
  paperStyle:{
   width: 800,
   height: 220,
   marginLeft: 20,
   paddingRight: 20,
   paddingLeft: 20
  }
};

const mutation = gql`
    mutation AddComment($by: String, $body: String, $contentId: ID){
        addComment(by: $by, body: $body, contentId: $contentId){
            id 
            comments{
                id
                by
                body
                likes
            }
        }
    }
`;

export default graphql(mutation)(AddComment);