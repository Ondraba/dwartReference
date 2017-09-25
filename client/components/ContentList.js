import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchContent from '../queries/fetchContent';

class ContentList extends Component {
  
    renderContent(){
        return this.props.data.content.map(({id, title}) => {
            return (
                <li key={id} className="collection-item">
                   {title}                 
                </li>
            );
        })
    }

    render(){
        if (this.props.data.loading){
            return <div>Loading...</div>;
        }
        return(
            <div>
                <ul className="collection">
                    {this.renderContent()}
                </ul>
            </div>
        )
    }
}

export default graphql(fetchContent)(ContentList);