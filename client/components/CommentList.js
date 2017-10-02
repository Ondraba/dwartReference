import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';


import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Delete from 'material-ui-icons/Delete';



const CommentList = (props) => {

    function addLikeToComment(id, likes){
        props.mutate({
            variables: { id },
             optimisticResponse: {
                __typename: 'Mutation',
                likeComment: {
                    id: id,
                    __typename: 'CommentType',
                    likes: likes++
                }
            }
        })
    }

    function renderComments(){
        return props.commentsObj.map(({id, by, body, likes}) => {
            return (
              <div key={id}>
                <IconButton touch={true} style={style.delete}>
                 <Delete />
                </IconButton>
                <TextField disabled={true} id="text-field-disabled" defaultValue={by}/>
                <br />
                <TextField disabled={true} id="text-field-disabled" defaultValue={body} fullWidth={true}/>
                <br />
                <div>
                  <IconButton touch={true} style={style.thumbup} onClick = {
                    () => addLikeToComment(id, likes)
                    } >
                      <ThumbUp />
                  </IconButton> 
                  <span style={style.thumbupText}>{likes}</span>
                </div>
              </div>
            );
        })
    }

   return(
     <div style = { style.wrapperStyle }>
       <Paper style={ style.paperStyle } zDepth={1} >
        {renderComments()}
       </Paper>
     </div>
   )
        
}

const style = {
  paperStyle: {
    width: 800,
    margin: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  thumbup:{
      marginLeft: '90%'
  },
  thumbupText: {
    fontWeight: 'bold',
    paddingTop: 20
  },
  delete: {
     marginLeft: '95%',
     top: 60
  }
};

const mutation = gql`
    mutation LikeComment($id: ID){
        likeComment(id: $id){
            id
            likes
        }
    }
`;

export default graphql(mutation)(CommentList);