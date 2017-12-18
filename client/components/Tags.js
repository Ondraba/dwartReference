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

const Tags = ({tags}) => {

    function renderTags(){
        return tags.map(({id, systemName, name}) => {
            return (
                <Tag systemName={systemName} name={name} id = {id} key={id} />
            );
        })
    }

   return(
     <div>
        {renderTags()}  
     </div>
   )
        
}

const style = {
};


export default Tags
