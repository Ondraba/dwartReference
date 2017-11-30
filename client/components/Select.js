import React, { Component } from 'react';
import R from 'ramda';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Select = ({dataList}) => {
    let selectValue 

    function handleChange(event, index, value){
        return selectValue = value;
    } 
        
    function fillMenuItems(items){
         return items.map(({id, state}) => {
            return(
             <MenuItem value={state} primaryText={state} key={id}/>
            )
        })
    }

    return(
     <Paper style={ style.paperStyle} zDepth={1} >
        <div style= {style.wrapperStyle}>
         <SelectField
          floatingLabelText="State"
          value={selectValue}
          onChange={handleChange}   >
          {fillMenuItems(dataList)}
        </SelectField>
        </div>
     </Paper>
    )
}


const style = {
  wrapperStyle: {
    paddingLeft: 20
  },
  paperStyle:{
    width: 1120,
    height: 80,
    marginLeft: 20,
    marginTop: 20
  }
};


export default Select;

