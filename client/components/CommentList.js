import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';


import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Delete from 'material-ui-icons/Delete';

import fetchContentDetail from '../queries/fetchContentDetail';

const CommentList = (props) => {

    console.log(props.detailId);

    function addLikeToComment(id, likes){
        props.LikeComment({
            variables: { id },
             mutation: 'LikeComment',
             optimisticResponse: {
                __typename: 'likeComment',
                likeComment: {
                    id: id,
                    __typename: 'CommentType',
                    likes: likes++
                }
            }
        })
    }

    function deleteComment(id){
        props.DeleteComment({
            mutation: 'DeleteComment',
            variables: { id },
            refetchQueries: [{ 
                query: fetchContentDetail,
                variables: { id : props.detailId }
             }]
        })
    }


    function renderComments(){
        return props.commentsObj.map(({id, by, body, likes}) => {
            return (
              <div key={id}>
                <IconButton touch={true} style={style.delete} onClick={
                    () => deleteComment(id)
                }>
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

const mutationLikeComment = gql`
    mutation LikeComment($id: ID){
        likeComment(id: $id){
            id
            likes
        }
    }
`;

const  mutationDeleteComment = gql`
    mutation DeleteComment($id: ID){
        deleteComment(id: $id){
            id
        }
    }
`;

const CommentListWithMutations = compose(
  graphql(mutationLikeComment, { 
      name: 'LikeComment' 
    }),
  graphql(mutationDeleteComment, {
       name: 'DeleteComment' 
    })
)(CommentList)

export default CommentListWithMutations

