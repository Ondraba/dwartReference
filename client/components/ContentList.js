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
import ThumbUp from 'material-ui-icons/ThumbUp';
import Delete from 'material-ui-icons/Delete';



const ContentList = ({contentData}) => {
    function renderContent(){
        return contentData.map(({id, title, main, header, footer, state, url}) => {
            return (
                <TableRow key={id} selectable={false}>
                    <TableRowColumn><Link to={`/contentDetail/${id}`}>{title}</Link></TableRowColumn>
                    <TableRowColumn>{state}</TableRowColumn>
                    <TableRowColumn>{url}</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>
                     <IconButton touch={true} >
                         <ThumbUp />
                     </IconButton>
                     <IconButton touch={true} >
                        <Delete />
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
            <FloatingActionButton secondary={true}>
             <ContentAdd />
            </FloatingActionButton>
        </Link>    
          <Table style={style.tableStyle}>
            <TableHeader adjustForCheckbox= {false} displaySelectAll = {false}>
                <TableRow>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>State</TableHeaderColumn>
                    <TableHeaderColumn>URL</TableHeaderColumn>
                    <TableHeaderColumn>Likes</TableHeaderColumn>
                    <TableHeaderColumn>Comments</TableHeaderColumn>
                    <TableHeaderColumn> </TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox= {false}>
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
    marginTop: 10   
  },
  linkStyle: {
      marginLeft: '92%',

  },
};

export default graphql(fetchContent)(ContentList);
