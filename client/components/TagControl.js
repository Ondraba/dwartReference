import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchContent from '../queries/fetchContent';
import R from 'ramda';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import Tag from './Tag';

class TagControl extends Component {
    constructor(props){
        super(props);

        this.state = {  systemName: '', activeTag: { systemName: '', name: ''}, tagsToPush: [] };
    }

    onSubmit(event){
        event.preventDefault();
        
        this.props.mutate({
            variables: {
                 tags:  this.state.tagsToPush,
            },
            refetchQueries: [{ 
                query: fetchContent
             }]
            //destructuring query : query
        })
    }

    renderTags(){
        return this.state.tagsToPush.map((tag) => {
            return (
                <Tag systemName={tag.systemName} name={tag.name} key={tag.systemName} />
            );
        })
    }

    render(){
        return(
         <Paper style={ style.paperStyle } zDepth={1} >
            <div style={style.wrapper}>
                <div> { this.renderTags() } </div>
                <h3>Create a Tag</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <TextField
                        hintText="Identifier"
                        onChange={event => this.setState({systemName : event.target.value})}
                        value={this.state.systemName}
                    />
                      <br />
                      <TextField 
                        hintText="Name"
                        onChange={event => this.setState({activeTag:name = event.target.value})}
                        value={this.state.activeTag.name}
                    />
                     <br />
                   <RaisedButton label="Add" primary={true} type="submit"/>
                </form>
            </div>
         </Paper>
        )
    }
}


const style = {
  wrapper: {
    width: 800,
    margin: 20,
  },
    paperStyle: {
    height: 260,
    width: 400,
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 20
  },
};


export default TagControl;