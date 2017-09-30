import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchContent from '../queries/fetchContent';

import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';



const ContentList = ({contentData}) => {
    function renderContent(){
        return contentData.map(({id, title, main, header, footer, state, url}) => {
            return (
                <TableRow key={id}>
                    <TableRowColumn><Link to={`/contentDetail/${id}`}>{title}</Link></TableRowColumn>
                    <TableRowColumn>{state}</TableRowColumn>
                    <TableRowColumn>{url}</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>
                     <IconButton touch={true} >
                        <ActionGrade />
                     </IconButton>
                    </TableRowColumn>
                </TableRow>
            );
        })
    }

   return(
     <div style = { style.wrapperStyle }>
       <Paper style={ style.paperStyle } zDepth={1} >
        <div style= { style.contentWrapperStyle }>
        <Link to="/content/add" style={style.linkStyle}>
            <FloatingActionButton secondary={true} style={style.linkStyle}>
             <ContentAdd />
            </FloatingActionButton>
        </Link>    
          <Table style={style.tableStyle}>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>State</TableHeaderColumn>
                    <TableHeaderColumn>URL</TableHeaderColumn>
                    <TableHeaderColumn>Favourite</TableHeaderColumn>
                    <TableHeaderColumn>Comments</TableHeaderColumn>
                    <TableHeaderColumn> </TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
             {renderContent()}
            </TableBody>
         </Table>
        </div>
       </Paper>
     </div>
   )
        
}

const style = {
  paperStyle: {
    height: 400,
    width: 800,
    margin: 20,
    paddingTop: 20
  },
  wrapperStyle: {
    margin: '0 auto'    
  },
  contentWrapperStyle: {
    paddingRight: 40    
  },
  tableStyle: {
    marginTop: 20    
  },
  linkStyle: {
      marginLeft: 5,
  },
};

export default graphql(fetchContent)(ContentList);
