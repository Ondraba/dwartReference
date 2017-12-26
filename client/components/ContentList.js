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
import FilterHolder from './FilterHolder';


class ContentList extends Component {
    constructor(props){
        super(props)
        this.getFilterPairs = this.getFilterPairs.bind(this);
        this.state = { filteredData : [...this.props.contentData] }
    }

    componentWillReceiveProps(changedProps) {
        this.setState({
            filteredData : [...changedProps.contentData]
        })
    }   

    likeContentById(id, likes){
       this.props.LikeContent({
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

   

  deleteContentById(id){
       this.props.DeleteContent({
           variables: {id},
            refetchQueries: [{ 
                query: fetchContent
             }]
       })
   }

  getFilterPairs(filteredPairs){
        let t = this;
        const final = [...this.props.contentData]

        const prom = () => new Promise(function(resolve, reject) {
            try {
                const filtered = () => {
                    let iterate = () => {
                        return filteredPairs.forEach((item, i) => {
                            let filterName  = item[0][0]
                            let filterValue = item[0][1]
                            return final.slice().reverse().forEach((c_item, x, arr) =>{
                                const originalPropertyValue = c_item[filterName]
                                if(originalPropertyValue !== filterValue){
                                 final.splice(arr.length - 1 - x, 1)
                                }
                            })
                        })
                        return final
                    }
                    return iterate()
                  }
                resolve(filtered());
            }
            catch (e) {
                reject(e)
            }
        })
        return prom()
        .then(() => t.setState({filteredData : final})
        );
   }

   renderContent(){
       console.log(this.props)
        return this.state.filteredData.map(({id, title, main, header, footer, state, url, likes, tags}) => {
            return (
                <TableRow key={id} selectable={false}>
                    <TableRowColumn><Link to={`/contentDetail/${id}`}>{title}</Link></TableRowColumn>
                    <TableRowColumn>{state}</TableRowColumn>
                    <TableRowColumn>{url}</TableRowColumn>
                    <TableRowColumn>{likes}</TableRowColumn>
                    <TableRowColumn style = {style.colWidth}>
                        <IconButton touch={true} onClick = {
                            () => this.likeContentById(id, likes)
                        }>
                            <ThumbUp />
                        </IconButton>
                     </TableRowColumn>
                     <TableRowColumn style = {style.colWidth}>
                        <IconButton touch={true} onClick ={
                            () => this.deleteContentById(id)
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

   render(){
        return(
        <div style = { style.wrapperStyle }>
        <FilterHolder contentData = { this.props.contentData } getFilterPairs = { this.getFilterPairs } />
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
                {this.renderContent()}
                </TableBody>
            </Table>
            </div>
        </Paper>
        </div>
    ) 
   }
  
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

