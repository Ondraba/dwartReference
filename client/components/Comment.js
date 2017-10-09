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


class Comment extends Component {
    constructor(props){
        super(props);
        this.state = { isEdit : false};
    }

    addLikeToComment(id, likes){
        this.props.LikeComment({
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

  deleteComment(id){
        this.props.DeleteComment({
            mutation: 'DeleteComment',
            variables: { id },
            refetchQueries: [{ 
                query: fetchContentDetail,
                variables: { id : props.detailId }
             }]
        })
    }

   onHandleCommentState(commentState){
       this.setState({isEdit: commentState})
    }


    renderSingleComment({id, by, body, likes}){
            const isEdit = this.state.isEdit

            return (
              <div>
                {isEdit ? (
                <div>
                    <IconButton touch={true} style={style.delete} onClick={
                        () => deleteComment(id)
                    }>
                    <Delete />
                    </IconButton>

                    <IconButton touch={true} style={style.edit} onClick={
                        () => this.onHandleCommentState('true')
                    }>
                    <Edit />
                    </IconButton>

                    <TextField disabled={false} id="text-field-disabled" defaultValue={by}/>
                    <TextField disabled={false} id="text-field-disabled" defaultValue={body} fullWidth={true}/>

                    <IconButton touch={true} style={style.thumbup} onClick = {
                    () => addLikeToComment(id, likes)
                    } >
                        <ThumbUp />
                    </IconButton> 

                    <span style={style.thumbupText}>{likes}</span>
                </div>
              ) : (
            <div>
                <IconButton touch={true} style={style.delete} onClick={
                    () => deleteComment(id)
                }>
                 <Delete />
                </IconButton>
                 <IconButton touch={true} style={style.edit} onClick={
                    () => this.onHandleCommentState(false)
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
              )}
            </div>
            );
        }

    render(){
        return(
            <div style = { style.wrapperStyle }>
            <Paper style={ style.paperStyle } zDepth={1} >
                {this.renderSingleComment(this.props.singleComment)}
            </Paper>
            </div>
        )  
    }
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
  },
  editButton:{
    marginLeft: '90%',
    width: 40
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

