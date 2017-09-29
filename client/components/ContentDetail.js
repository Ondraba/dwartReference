import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchContentDetail from '../queries/fetchContentDetail';


const ContentDetail = (props) => {
   const  _contentDetail  = props.data.contentDetail;

    if (!_contentDetail){
            return <div>Loading...</div>;
    }

   return(
     <div>
        <h1> {_contentDetail.title} </h1>
        <div>
            {_contentDetail.title} |  {_contentDetail.main} | {_contentDetail.header} | {_contentDetail.footer} | {_contentDetail.state} | {_contentDetail.turl}
        </div>
     </div>
   )
        
}
export default graphql(fetchContentDetail, {
    options: (props) => { 
        return { 
            variables: {id: props.params.id}
        }
    }
})(ContentDetail);


