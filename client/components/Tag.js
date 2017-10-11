import React, { Component } from 'react';

const Tag = ({systemName, name}) => {
   return(
     <span style={ style.box} >{name}</span>
   )
        
}

const style = {
  box: {
    paddingTop: 15,
    textAlign: 'center',
    backgroundColor: 'grey',
    maxWidth: 60,
    padding: 5,
    marginLeft: 5,
    borderRadius: '15%'
  }
};

export default Tag