import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {findDOMNode} from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';



 class AddComment extends Component {
    constructor(props){
        super(props);
        this.state = { byInput : '', bodyInput: ''}
    }

    clearAll(){
        this.setState({byInput: '', bodyInput: ''})
    }

    handleSubmit(){
        this.props.mutate({
        variables: {
            by: this.state.byInput,
            body: this.state.bodyInput,
            contentId: this.props.contentId
            }
        }).then(this.clearAll());
    }
    
    render(){
        return(
            <Paper style={ style.paperStyle} zDepth={1} >
                <div style={style.wrapperStyle}>
                    <h3>Add comment:</h3>
                    <TextField  hintText="Your nickname"  value = {this.state.byInput} onChange={event =>{
                        this.setState({byInput: event.target.value })
                        }
                    } />
                    <br />
                    <TextField  hintText="Add comment"  fullWidth={true}  value={this.state.bodyInput} onChange={event => { 
                        this.setState({bodyInput: event.target.value})
                        }
                    } />
                    <br />
                    <RaisedButton label="Send" secondary={true} onClick={this.handleSubmit.bind(this)}/> 
                </div>
            </Paper>
        )
    }
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