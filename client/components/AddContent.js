import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchContent from '../queries/fetchContent';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import TagControl from './TagControl';

class AddContent extends Component {
    constructor(props){
        super(props);

        this.state = { title: '', main: '', header: '', footer: '', state: '', url: '', hasTags: false, prepairedTags: [] };

        this.setPrepairedTags = this.setPrepairedTags.bind(this);
        this.saveContentThenTags = this.saveContentThenTags.bind(this);
    }

 
    onSubmit(event){
        event.preventDefault();
        this.saveContentThenTags();
    }

    setPrepairedTags(array){
        this.setState({prepairedTags: array})
    }

    tagsProceed(contentId){
        return this.props.AddTagArray({
            mutation: 'AddTagArray',
            variables: {
                tagArray: this.state.prepairedTags,
                contentId: contentId
        },
        refetchQueries: [{ 
            query: fetchContent
            }]
        })
    }

    saveContent(){
        return this.props.AddContent({
            mutation: 'AddContent',
            variables: {
                title:  this.state.title,
                    main:  this.state.main,
                header:  this.state.header,
                footer:  this.state.footer,
                state:  this.state.state,
                    url:  this.state.url
            },
        })
    }

    saveContentThenTags(){
         this.saveContent()
          .then(({data}) => this.tagsProceed(data.addContent.id))
          .then(() => hashHistory.push('/Admin'))
    }

    render(){
        return(
         <Paper style={ style.paperStyle } zDepth={1} id="detailPaper">
            <div style={style.wrapper}>
                <Link to="/Admin" style={style.linkStyle}>
                 <RaisedButton label="Back" primary={true} type="submit"/>
                </Link>
                <h3>Create a Content</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <TextField
                        hintText="Title"
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title}
                    />
                      <br />
                      <TextField 
                        hintText="Main"
                        fullWidth={true}
                        onChange={event => this.setState({main: event.target.value})}
                        value={this.state.main}
                    />
                      <br />
                      <TextField 
                        hintText="Header"
                        onChange={event => this.setState({header: event.target.value})}
                        value={this.state.header}
                    />
                      <br />
                      <TextField
                        hintText="Footer"
                        onChange={event => this.setState({footer: event.target.value})}
                        value={this.state.footer}
                    />
                      <br />
                      <TextField 
                        hintText="State"
                        onChange={event => this.setState({state: event.target.value})}
                        value={this.state.state}
                    />
                       <br />
                      <TextField 
                        hintText="URL"
                        onChange={event => this.setState({url: event.target.value})}
                        value={this.state.url}
                    />
                       <br />
                   <RaisedButton label="Create" secondary={true} type="submit" className="addNewcontent" />
                </form>
                  <TagControl setPrepairedTags = { this.setPrepairedTags } />    
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
    height: 800,
    width: 900,
    margin: 20,
    paddingTop: 20
  },
};


const mutationAddContent = gql`
   mutation AddContent($title: String, $main: String, $header: String, $footer: String, $state: String, $url: String){
       addContent(title: $title, main: $main, header: $header, footer: $footer, state: $state, url: $url){
           id, title, main, header, footer, state, url 
       }
   }
`;

const mutationAddTagArray = gql`
mutation AddTagArray($tagArray: [TagArrayType], $contentId: ID){
    addTagArray(tagArray: $tagArray, contentId: $contentId){
      id
    }
}
`;

  const AddContentWithMutations = compose (
    graphql(mutationAddContent, { 
        name: 'AddContent' 
      }),
    graphql(mutationAddTagArray, {
         name: 'AddTagArray' 
      })
  )(AddContent)

export default AddContentWithMutations

