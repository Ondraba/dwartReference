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
    backgroundColor: '#ff4081',
    maxWidth: 60,
    padding: 5,
    marginLeft: 5,
    borderRadius: '2%'
  }
};

export default Tag