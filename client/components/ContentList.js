import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

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
import Edit from 'material-ui-icons/Edit';

import fetchContent from '../queries/fetchContent';

import Tags from './Tags';

const ContentList = (props) => {

     function likeContentById(id, likes){
       props.LikeContent({
             variables: { id },
             optimisticResponse: {
                __typename: 'Mutation',
                likeContent: {
                    id: id,
                    __typename: 'ContentType',
                    likes: likes++
                }
            }
       })
   }

   function deleteContentById(id){
       props.DeleteContent({
           variables: {id},
            refetchQueries: [{ 
                query: fetchContent
             }]
       })
   }

    function renderContent(){
        return props.contentData.map(({id, title, main, header, footer, state, url, likes, tags}) => {
            return (
                <TableRow key={id} selectable={false}>
                    <TableRowColumn><Link to={`/contentDetail/${id}`}>{title}</Link></TableRowColumn>
                    <TableRowColumn>{state}</TableRowColumn>
                    <TableRowColumn>{url}</TableRowColumn>
                    <TableRowColumn>{likes}</TableRowColumn>
                    <TableRowColumn style = {style.colWidth}>
                        <IconButton touch={true} onClick = {
                            () => likeContentById(id, likes)
                        }>
                            <ThumbUp />
                        </IconButton>
                     </TableRowColumn>
                     <TableRowColumn style = {style.colWidth}>
                        <IconButton touch={true} onClick ={
                            () => deleteContentById(id)
                        }>
                            <Delete />
                        </IconButton>
                     </TableRowColumn>
                     <TableRowColumn style = {style.colWidth}>
                        <Link to={`/updateContent/${id}`}>
                            <IconButton touch={true}>
                                <Edit />
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                    <TableRowColumn><Tags tags={tags}/></TableRowColumn>
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
                    <TableHeaderColumn style = {style.colWidth}> </TableHeaderColumn>
                    <TableHeaderColumn style = {style.colWidth}> </TableHeaderColumn>
                    <TableHeaderColumn style = {style.colWidth}> </TableHeaderColumn>
                    <TableHeaderColumn> Tags </TableHeaderColumn>
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
    width: 1120,
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
  colWidth: {
        width: '1rem'
  }
};


const mutationLikeContent = gql`
    mutation LikeContent($id: ID){
        likeContent(id: $id){
            id
            likes
        }
    }
`;


const mutationDeleteContent = gql`
    mutation DeleteContent($id: ID){
        deleteContent(id: $id){
            id
        }
    }
`;


const ContentListWithMutations = compose(
  graphql(mutationLikeContent, { 
      name: 'LikeContent' 
    }),
  graphql(mutationDeleteContent, {
       name: 'DeleteContent' 
    })
)(ContentList)

export default ContentListWithMutations

