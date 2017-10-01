import React, { Component } from 'react';
import R from 'ramda';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';


const Overview = ({contentData}) => {

    function openContentData(){
      return contentData.map(({id, main}) => {
            return(
            <ul key={id}>
                <li className="collection-item">
                {main} 
                </li>
            </ul>
            )
        })
    } 

    function contentCount(){
        return R.length(contentData)
    }


    return(
     <Paper style={ style.paperStyle} zDepth={1} >
        <div style= {style.wrapperStyle}>
        Items in database: {contentCount()} | Last update: 00:00 | Activity overview: 0
        </div>
     </Paper>
    )
}


const style = {
  wrapperStyle: {
    paddingLeft: 20
  },
  paperStyle:{
    width: 800,
    height: 50,
    marginLeft: 20,
    paddingTop: 15
  }
};


export default Overview;


