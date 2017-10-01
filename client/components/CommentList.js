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



const CommentList = ({commentsObj}) => {
    function renderComments(){
        return commentsObj.map(({id, by, body}) => {
            return (
              <div key={id}>
                <TextField disabled={true} id="text-field-disabled" defaultValue={by}/>
                <br />
                <TextField disabled={true} id="text-field-disabled" defaultValue={body} fullWidth={true}/>
                <br />
                <IconButton touch={true} style={style.thumbup}>
                    <ThumbUp />
                </IconButton>
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
      marginLeft: '95%'
  },
};

export default CommentList;