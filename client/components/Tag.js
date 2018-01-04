
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchContent from '../queries/fetchContent';



const Tag = (props) => {
  function handleClick(e){
    e.preventDefault()
    deleteTag(props.id)
  }

function deleteTag(id){
      props.mutate({
          variables: {id},
           refetchQueries: [{ 
                query: fetchContent
             }]
      })
  }


   return(
     <span style={ style.box } onClick={handleClick}>{props.name}</span>
   )
        
}

const style = {
  box: {
    paddingTop: 15,
    textAlign: 'center',
    backgroundColor: '#ff4081',
    maxWidth: 60,
    padding: 5,
    marginLeft: 5,
    borderRadius: '2%',
    '&:hover': {
      backgroundColor: '#90A4AE'
    },
  },
};

const mutation = gql`
    mutation DeleteTag($id: ID){
        deleteTag(id: $id){
            id
        }
    }
`;


export default graphql(mutation)(Tag);