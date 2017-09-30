import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {findDOMNode} from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


const AddComment = () => {
        const commentVariables = {
            body: '',
            by: ''
        }
        
        return(
            <Paper style={ style.paperStyle} zDepth={1} >
                <div style={style.wrapperStyle}>
                    <h3>Add comment:</h3>
                    <TextField  hintText="Your nickname" />
                    <br />
                    <TextField  hintText="Add comment"  fullWidth={true}  />
                    <br />
                    <RaisedButton label="Komentovat" secondary={true} />
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

export default AddComment;