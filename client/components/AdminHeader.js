import React, { Component } from 'react';

const AdminHeader = () => {
   return(
     <div style = { style.wrapperStyle }>
        <h1>DwarfQL</h1>
     </div>
   )
        
}

const style = {
  wrapperStyle: {
    paddingLeft: 40,
    paddingTop: 20
  },
};

export default AdminHeader