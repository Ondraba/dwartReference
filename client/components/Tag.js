import React, { Component } from 'react';

const Tag = ({systemName, name}) => {
   return(
     <div style={ style.box} >{name}</div>
   )
        
}

const style = {
  box: {
    paddingTop: 15,
    textAlign: 'center'
  }
};

export default Tag