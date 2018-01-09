import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';


import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Delete from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';

import Tag from './Tag';

const Tags = (props) => {

    function randomize(){
        let no = Math.random(0,9999)
        return no
    }

    function renderTags(){
        return props.tags.map(({id, systemName, name}, index) => {
            return (
                <Tag systemName={systemName} name={name} id = {id} key={index + 1} />
            );
        })
    }
    
   return(
     <div>
      { props.tags ? renderTags() : <span></span> }
     </div>
   )
        
}

const style = {
};


export default Tags
