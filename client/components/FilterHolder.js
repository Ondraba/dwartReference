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
        let t = this;
        const prom = () => new Promise(function(resolve, reject) {
            try {
                const arr = t.state.filterKeysAndValuePairs;
                const filtered = arr.filter((item) =>{
                    return item[0][0] !== newKeyValuePair[0][0]
                })
                const extendedArr = [...filtered, newKeyValuePair];
                resolve(t.setState({filterKeysAndValuePairs: extendedArr}));
            }
            catch (e) {
                reject(e)
            }
        })
        return prom()
        .then(() => t.props.getFilterPairs(t.state.filterKeysAndValuePairs)
        );
    }

    getStates(){
        const states = this.props.contentData.map((item) =>{
            return item.state
        })
        return states;
    }

    getTitles(){
        const titles = this.props.contentData.map((item) =>{
            return item.title
        })
        return titles;
    }
    

    filterProceed(){

    }

    resetAll(){

    }
    
    render(){
        return(
            <div>
                 <Select contentData={this.getStates()} label='State' keyPropertyName='state' addNewFilterPair={this.addNewFilterPair} />
                 <Select contentData={this.getTitles()} label='Title' keyPropertyName='title' addNewFilterPair={this.addNewFilterPair} />
            </div>
        )
    }
}

const style = {
};


export default FilterHolder

