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
import Edit from 'material-ui-icons/Edit';

import fetchContentDetail from '../queries/fetchContentDetail';


const Comment = (props) => {
     const t = {
         state: {isEdit : false},
         __proto__: React.Component.prototype
     }

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

    function onEdit(){
        t.setState({isEdit : true})
    }


    function renderSingleComment({id, by, body, likes}){
        console.log(t.state.isEdit);
            return (
              <div>
                <IconButton touch={true} style={style.delete} onClick={
                    () => deleteComment(id)
                }>
                 <Delete />
                </IconButton>
                 <IconButton touch={true} style={style.edit} onClick={
                    () => onEdit()
                }>
                 <Edit />
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
    }
    
   t.render = () => {
    return(
        <div style = { style.wrapperStyle }>
        <Paper style={ style.paperStyle } zDepth={1} >
            {renderSingleComment(props.singleComment)}
        </Paper>
        </div>
    )
  }

  return t;    
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
  },
  edit: {
     marginLeft: '90%',
     top: 11
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

const CommentWithMutations = compose(
  graphql(mutationLikeComment, { 
      name: 'LikeComment' 
    }),
  graphql(mutationDeleteComment, {
       name: 'DeleteComment' 
    })
)(Comment)

export default CommentWithMutations

