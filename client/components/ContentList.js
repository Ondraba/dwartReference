import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchContent from '../queries/fetchContent';

import FelaTest from '../fela/FelaTest';

class ContentList extends Component {
  
    renderContent(){
        return this.props.data.content.map(({id, title, main, header, footer, state, url}) => {
            return (
                <ul key={id} className="collection">
                    <li className="collection-item">
                     {title}
                    </li>
                     <li className="collection-item">
                     {main}
                    </li>
                </ul>
            );
        })
    }

    render(){
        if (this.props.data.loading){
            return <div>Loading...</div>;
        }
        return(
            <FelaTest>
                <div>
                        {this.renderContent()}
                </div>
            </FelaTest>
        )
    }
}

export default graphql(fetchContent)(ContentList);