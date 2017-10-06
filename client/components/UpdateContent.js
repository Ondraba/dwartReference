import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchContent from '../queries/fetchContent';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import fetchContentDetail from '../queries/fetchContentDetail';



class UpdateContent extends Component {
    constructor(props){
        super(props);
        this.state = { title: '', main: '', header: '', footer: '', state: '', url: ''};
    }

   componentWillReceiveProps(changedProps) {
    this.setState({
        title: changedProps.data.contentDetail.title,
        main: changedProps.data.contentDetail.main,
        header: changedProps.data.contentDetail.header,
        footer: changedProps.data.contentDetail.footer,
        state: changedProps.data.contentDetail.state,
        url: changedProps.data.contentDetail.url
    })
  }   

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                   id: this.props.params.id,
                title:  this.state.title,
                 main:  this.state.main,
               header:  this.state.header,
               footer:  this.state.footer,
                state:  this.state.state,
                  url:  this.state.url
            },
            refetchQueries: [{ 
                query: fetchContent
             }]
            //destructuring query : query
        }).then(() => hashHistory.push('/Admin')); 
    }


    render(){
        if (this.props.data.loading){
            return <div>Loading...</div>;
        }
        return(
         <Paper style={ style.paperStyle } zDepth={1} >
            <div style={style.wrapper}>
                <Link to="/Admin" style={style.linkStyle}>
                 <RaisedButton label="Back" primary={true} type="submit"/>
                </Link>
                <h3>Update a Content</h3>
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
                   <RaisedButton label="Update" secondary={true} type="submit"/>
                    
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
    height: 500, 
    width: 900,
    margin: 20,
    paddingTop: 20
  },
};


const mutation = gql`
   mutation UpdateContent($id: ID, $title: String, $main: String, $header: String, $footer: String, $state: String, $url: String){
       updateContent(id: $id, title: $title, main: $main, header: $header, footer: $footer, state: $state, url: $url){
           id, title, main, header, footer, state, url 
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
)(UpdateContent)
