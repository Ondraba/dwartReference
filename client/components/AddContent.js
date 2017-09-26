import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchContent from '../queries/fetchContent';

class AddContent extends Component {
    constructor(props){
        super(props);

        this.state = { title: '', main: '', header: '', footer: '', state: '', url: ''};
    }

    onSubmit(event){
        event.preventDefault();
        
        this.props.mutate({
            variables: {
                title:  this.state.title,
                 main:  this.state.main,
               header:  this.state.header,
               footer:  this.state.footer,
                state:  this.state.state,
                  url:  this.state.url
            },
            refetchQueries: [{ fetchContent }]
            //destructuring query : query
        }).then(() => hashHistory.push('/')); 
    }

    render(){
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>Create a Content</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Title:</label>
                    <input 
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title}
                    />
                      <input 
                        onChange={event => this.setState({main: event.target.value})}
                        value={this.state.main}
                    />
                      <input 
                        onChange={event => this.setState({header: event.target.value})}
                        value={this.state.header}
                    />
                      <input 
                        onChange={event => this.setState({footer: event.target.value})}
                        value={this.state.footer}
                    />
                      <input 
                        onChange={event => this.setState({state: event.target.value})}
                        value={this.state.state}
                    />
                      <input 
                        onChange={event => this.setState({url: event.target.value})}
                        value={this.state.url}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}


const mutation = gql`
   mutation AddContent($title: String, $main: String, $header: String, $footer: String, $state: String, $url: String){
       addContent(title: $title, main: $main, header: $header, footer: $footer, state: $state, url: $url){
           title, main, header, footer, state, url 
       }
   }
`;

export default graphql(mutation)(AddContent);