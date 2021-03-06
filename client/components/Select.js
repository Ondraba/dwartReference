import React, { Component } from 'react';
import R from 'ramda';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Select extends Component {
     constructor(props){
        super(props);
        this.state = { selectValue: ''};
        this.keyPropertyName = this.props.keyPropertyName;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value){
         this.setState({selectValue: value})
         this.props.addNewFilterPair(this.sendKeyValuePairToFilterHolder(value))
    } 

    sendKeyValuePairToFilterHolder(val){
        const keyPropertyName = this.keyPropertyName;
        const keyPropertyValue = val;
        const newPair = [];
        return [...newPair, [keyPropertyName, keyPropertyValue]]
    }
        
    fillMenuItems(items){
         return items.map((item) => {
            return(
             <MenuItem value={item} primaryText={item} key={item}/>
            )
        })
    }

    render(){
        return(
                <div style= {style.wrapperStyle}>
                    <SelectField
                        floatingLabelText={this.props.label}
                        value={this.state.selectValue}
                        onChange={this.handleChange}   >
                         <MenuItem value={null} primaryText="" />
                        {this.fillMenuItems(this.props.contentData)}
                    </SelectField>
                </div>
            )
    }
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


export default Select

