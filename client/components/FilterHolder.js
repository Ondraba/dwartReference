import React, { Component } from 'react';
import R from 'ramda';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Select from './Select';


class FilterHolder extends Component {
     constructor(props){
        super(props);
        this.state = { filterKeysAndValuePairs: []};

        this.addNewFilterPair = this.addNewFilterPair.bind(this);
    }

    addNewFilterPair(newKeyValuePair){
        this.setState({filterKeysAndValuePairs: [...this.state.filterKeysAndValuePairs, ...[newKeyValuePair]]})

        console.log(this.state.filterKeysAndValuePairs);
    }

    filterProceed(){

    }

    resetAll(){

    }
    
    render(){
        return(
            <div>
                 <Select contentData={this.props.contentData} label='State' keyPropertyName='state' addNewFilterPair={this.addNewFilterPair} />
            </div>
        )
    }
}

const style = {
};


export default FilterHolder

