import React, { Component } from 'react';

const AdminHeader = () => {
   return(
     <div style = { style.wrapperStyle }>
        <h1 style={style.DWARF}>DWARF<span style={style.QL}>QL</span></h1>
     </div>
   )
        
}

const style = {
  wrapperStyle: {
    paddingLeft: 40,
    paddingTop: 20
  },
  QL: {
    color: '#ff4081',
  },
  DWARF: {
    fontFamily: 'Impact'
  }
};

export default AdminHeader