import React, { Component } from 'react';
import Paper from 'material-ui/Paper';


const AdminFooter = () => {
   return(
     <Paper style={ style.paperStyle} zDepth={1} >
      <div style={style.wrapperStyle}>
          <span>DwarfQL 2017 (c)</span>
      </div>
     </Paper>
   )
        
}

const style = {
  wrapperStyle: {
    paddingTop: 15,
    textAlign: 'center'
  },
  paperStyle:{
   width: 1120,
   height: 50,
   marginLeft: 20
  }
};

export default AdminFooter