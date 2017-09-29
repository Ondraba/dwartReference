import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchContent from '../queries/fetchContent';


const ContentList = ({contentData}) => {
    function renderContent(){
        return contentData.map(({id, title, main, header, footer, state, url}) => {
            return (
                <ul key={id} className="collection">
                    <li className="collection-item">
                      <Link to={`/contentDetail/${id}`}>{title}</Link>
                      {main} | {header} | {footer} | {state} | {url}
                    </li>
                </ul>
            );
        })
    }

   return(
     <div>
        {renderContent()}
     </div>
   )
        
}

export default graphql(fetchContent)(ContentList);
