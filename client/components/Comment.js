import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';


import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {red500} from 'material-ui/styles/colors';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Delete from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';


import fetchContentDetail from '../queries/fetchContentDetail';


class Comment extends Component {
    constructor(props){
        super(props);
        this.state = { isEdit : false, by : this.props.singleComment.by, body: this.props.singleComment.body};
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
                variables: { id : this.props.detailId }
             }]
        })
    }

    updateComment(id, by, body){
        this.props.UpdateComment({
            mutation: 'UpdateComment',
            variables: { id, by, body }
        })
    }

   onEdit(){
       this.setState({isEdit: true})
    }

    onRead(id, by, body){
        this.setState({isEdit: false})
        this.updateComment(id, by, body)
    }


    renderSingleComment({id, by, body, likes}){
            const isEdit = this.state.isEdit
            let byHolder
            let bodyHolder

            return (
              <div>
                {isEdit ? (
                <div>
                    <IconButton touch={true} style={style.delete} onClick={
                        () => this.deleteComment(id)
                    }>
                    <Delete />
                    </IconButton>

                    <IconButton touch={true} style={style.editActive}  onClick={
                        () => this.onRead(id, this.state.by, this.state.body)
                    }>
                    <Edit color={red500}/>
                    </IconButton>

                    <TextField disabled={false} id="text-field-disabled"  onChange={event => this.setState({by: event.target.value})}
                        value={this.state.by}/>
                    <TextField disabled={false} id="text-field-disabled" fullWidth={true}  onChange={event => this.setState({body: event.target.value})}
                        value={this.state.body}/>
                    <IconButton touch={true} disabled={true} style={style.thumbup} onClick = {
                    () => this.addLikeToComment(id, likes)
                    } >
                        <ThumbUp />
                    </IconButton> 
                </div>
              ) : (
            <div>
                <IconButton touch={true} style={style.delete} onClick={
                    () => this.deleteComment(id)
                }>
                 <Delete />
                </IconButton>
                 <IconButton touch={true} style={style.edit} onClick={
                    () => this.onEdit()
                }>
                 <Edit />
                </IconButton>
                        <TextField disabled={true} id="text-field-disabled" value={this.state.by} />
                        <br />
                        <TextField disabled={true} id="text-field-disabled" value={this.state.body} fullWidth={true}/>
                        <br />
                <div>
                  <IconButton touch={true} style={style.thumbup} onClick = {
                    () => this.addLikeToComment(id, likes)
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
  editActive: {
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

const  mutationUpdateComment = gql`
    mutation UpdateComment($id: ID, $by: String, $body: String){
        updateComment(id: $id, by: $by, body: $body){
            id
            by
            body
        }
    }
`;

const CommentWithMutations = compose(
  graphql(mutationLikeComment, { 
      name: 'LikeComment' 
    }),
  graphql(mutationDeleteComment, {
       name: 'DeleteComment' 
    }),
   graphql(mutationUpdateComment, {
       name: 'UpdateComment'
   }) 
)(Comment)

export default CommentWithMutations

