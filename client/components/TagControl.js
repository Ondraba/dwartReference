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

        this.state = { activeTag: { systemName: '', name: ''}, tagsToPush: [] };
    }

    onSubmit(event){
        let t = this;
        event.preventDefault();
        const prom = () => new Promise(function(resolve, reject) {
                try {
                   t.pushActiveTag().then(()=>t.sendTagsToParent()); ;
                }
                catch (e) {
                    reject(e)
                }
            })
        return prom();
    }

    pushActiveTag(){
        let t = this;
        const prom = () => new Promise(function(resolve, reject) {
            try {
                resolve(t.setState({tagsToPush: [...t.state.tagsToPush, t.state.activeTag]}));
            }
            catch (e) {
                reject(e)
            }
        })
        return prom();
    }

    sendTagsToParent(){
        console.log(this.state);
        this.props.setPrepairedTags(this.state.tagsToPush)
    }

    tagsProceed(contentId){
        console.log(this.state.tagsToPush);
        this.props.mutate({
            variables: {
                tagArray: this.state.tagsToPush,
                contentId: contentId
        }})
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
                <br />
                <div> { this.renderTags() } </div>
                <br />
                <h3>Create a Tag</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <TextField
                        hintText="Identifier"
                        onChange={ event => { this.setState({ activeTag  : Object.assign({}, this.state.activeTag , {systemName: event.target.value})})} }
                        value={ this.state.activeTag.systemName }
                    />
                      <br />
                      <TextField 
                        hintText="Name"
                        onChange={event => this.setState({ activeTag  : Object.assign({}, this.state.activeTag , {name: event.target.value})}) }
                        value={ this.state.activeTag.name }
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
    height: 300,
    width: 400,
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 20
  },
};


const mutation = gql`
    mutation AddTagArray($tagArray: [TagArrayType], $contentId: ID){
        addTagArray(tagArray: $tagArray, contentId: $contentId){
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


export default graphql(mutation)(TagControl);


