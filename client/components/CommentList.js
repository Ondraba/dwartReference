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

import Comment from './Comment';

const CommentList = (props) => {

    function renderComments(){
        return props.commentsObj.map((singleComment) => {
            return (
                <Comment singleComment={singleComment} detailId={props.detailId} key={singleComment.id} />
            );
        })
    }

   return(
     <div>
        {renderComments()}
     </div>
   )
        
}

const style = {
};


export default CommentList
