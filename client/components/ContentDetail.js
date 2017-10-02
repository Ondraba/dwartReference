import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import fetchContentDetail from '../queries/fetchContentDetail';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';



import AddComment from './AddComment';
import CommentList from './CommentList';


const ContentDetail = (props) => {
   const  _contentDetail  = props.data.contentDetail;

   function likeContentById(id, likes){
       props.mutate({
             variables: { id },
             optimisticResponse: {
                __typename: 'Mutation',
                likeContent: {
                    id: id,
                    __typename: 'ContentType',
                    likes: likes++
                }
            }
       })
   }

    if (!_contentDetail){
            return <div>Loading...</div>;
    }

   return(
     <div style={style.wrapperStyle}>
         <Link to="/Admin" style={style.linkStyle}>
            <RaisedButton label="Back" primary={true} type="submit"/>
         </Link>
        <Paper style={ style.paperStyle } zDepth={1} >
            <h1> {_contentDetail.title} </h1>
            <div>
                <p>{_contentDetail.title} </p>
                <p>{_contentDetail.main}</p>
                <p> {_contentDetail.header}</p>
                <p> {_contentDetail.footer}</p>
                <p> {_contentDetail.state}</p> 
                <p> {_contentDetail.ur}</p> 
            </div>
            <div style={style.underScore}>
                <span style={style.likeLabel}>{_contentDetail.likes}</span>
                <IconButton touch={true} style={style.likeButton} onClick = {
                    () => likeContentById(_contentDetail.id, _contentDetail.likes)
                }>
                    <ThumbUp />
                </IconButton>
            </div>
        </Paper>
        <CommentList commentsObj={_contentDetail.comments}/>
        <AddComment contentId={_contentDetail.id}/>
     </div>
   )
        
}


const style = {
  wrapperStyle: {
    paddingLeft: 20,
    paddingTop: 20
  },
  paperStyle: {
    height: 500,
    width: 800,
    margin: 20,
    paddingTop: 20,
    paddingLeft: 20
  },
  linkStyle: {
    margin: 20  
  },
  underScore: {
      marginTop: 200,
      width: 780,
      textAlign: 'right'
  },
  likeLabel: {
     fontWeight: 'bold'
  },
  likeButton: {
    top: 3.5
  },
};


const mutation = gql`
    mutation LikeContent($id: ID){
        likeContent(id: $id){
            id
            likes
        }
    }
`;



export default compose(
    graphql(fetchContentDetail,{
        options: (props) => {
            return {
                variables: {id: props.params.id}
            }
        }
    }),
    graphql(mutation),
)(ContentDetail)

