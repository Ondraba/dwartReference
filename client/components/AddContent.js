import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchContent from '../queries/fetchContent';

class AddContent extends Component {
    constructor(props){
        super(props);

        this.state = { title: ''};
    }

    onSubmit(event){
        event.preventDefault();
        
        this.props.mutate({
            variables: {
                title:  this.state.title ,
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
                </form>
            </div>
        )
    }
}


const mutation = gql`
   mutation AddContent($title: String){
       addContent(title: $title){
           title
       }
   }
`;

export default graphql(mutation)(AddContent);