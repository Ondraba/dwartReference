import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchContent from '../queries/fetchContent';

import FelaTest from '../fela/FelaTest';

import Overview from './Overview';
import ContentList from './ContentList';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

class AdminDriver extends Component {

    contentData(){
        return this.props.data.content
    }

    render(){
        if (this.props.data.loading){
            return <div>Loading...</div>;
        }
        const contentData = this.props.data.content;
        return(
         <div>
             <AdminHeader /> 
             <Overview contentData={this.contentData()} />
             <ContentList contentData={this.contentData()} />
             <AdminFooter />
         </div>
        )
    }
}

const style = {
  overviewWrapper: {
    height: 600,
    width: 800,
    margin: 20,
  },
  contentListWrapper: {
    margin: '0 auto'    
  },
  header: {
    paddingRight: 40    
  },
  footer: {
    paddingRight: 40    
  },
};

export default graphql(fetchContent)(AdminDriver);