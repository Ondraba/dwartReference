import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import fetchContentDetail from '../queries/fetchContentDetail';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';

import AddComment from './AddComment';
import CommentList from './CommentList';
import Tags from './Tags';

class ContentDetail extends Component {
     constructor(props){
        super(props);
        this.state = { contentDetail: ''};
    }
    
     componentDidUpdate(previousProps, previousState) {
         console.log(this.props.data)
        if(previousProps.data !== this.props.data) {
           this.setState({contentDetail: this.props.data.contentDetail})  
           this.componentView(this.props.data.contentDetail.id, this.props.data.contentDetail.views)      
        }
     } 

   likeContentById(id, likes){
       this.props.LikeContent({
             variables: { id },
             optimisticResponse: {
                __typename: 'likeContent',
                likeContent: {
                    id: id,
                    __typename: 'ContentType',
                    likes: likes++
                }
            }
       })
   }

   componentView(id, views){
       this.props.AddView({
             variables: { id },
             optimisticResponse: {
                __typename: 'addView',
                addView: {
                    id: id,
                    __typename: 'ContentType',
                    views: views++
                }
            }
       })
   }
    
   render(){
    if (!this.state.contentDetail){
            return <div>Loading...</div>;
    }
    return(
        <div style={style.wrapperStyle}>
            <Link to="/Admin" style={style.linkStyle}>
                <RaisedButton label="Back" primary={true} type="submit"/>
            </Link>
            <Paper style={ style.
            
            paperStyle } zDepth={1} >
                <Tags tags = {this.state.contentDetail.tags} />
                <h1> {this.state.contentDetail.title} </h1>
                <p>{this.state.contentDetail.views}</p>
                <div>
                    <p>{this.state.contentDetail.title} </p>
                    <p>{this.state.contentDetail.main}</p>
                    <p> {this.state.contentDetail.header}</p>
                    <p> {this.state.contentDetail.footer}</p>
                    <p> {this.state.contentDetail.state}</p> 
                    <p> {this.state.contentDetail.ur}</p> 
                </div>
                <div style={style.underScore}>
                    <span style={style.likeLabel}>{this.state.contentDetail.likes}</span>
                    <IconButton touch={true} style={style.likeButton} onClick = {
                        () => this.likeContentById(this.state.contentDetail.id, this.state.contentDetail.likes)
                    }>
                        <ThumbUp />
                    </IconButton>
                </div>
            </Paper>
            <CommentList commentsObj={this.state.contentDetail.comments} detailId = {this.state.contentDetail.id}/>
            <AddComment contentId={this.state.contentDetail.id}/>
        </div>
     )
   }
}
        


const style = {
  wrapperStyle: {
    paddingLeft: 20,
    paddingTop: 20
  },
  paperStyle: {
    width: 800,
    margin: 20,
    paddingTop: 20,
    paddingLeft: 20
  },
  linkStyle: {
    margin: 20  
  },
  underScore: {
      marginTop: '10%',
      width: 780,
      textAlign: 'right'
  },
  likeLabel: {
     fontWeight: 'bold'
  },
  likeButton: {
    top: 3.5
  },
};


const mutationLikeContent = gql`
    mutation LikeContent($id: ID){
        likeContent(id: $id){
            id
            likes
        }
    }
`;

const mutationAddView = gql`
    mutation AddView($id: ID){
        addView(id: $id){
            id
            views
        }
    }
`;


export default compose(
    graphql(fetchContentDetail,{
        options: (props) => {
            return {
                variables: {id: props.params.id}
            }
        }
    }),
    graphql(mutationLikeContent, { 
      name: 'LikeContent' 
    }),
    graphql(mutationAddView, {
       name: 'AddView' 
    })
)(ContentDetail)

