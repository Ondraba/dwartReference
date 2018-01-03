import React, { Component } from 'react';
import R from 'ramda';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Select from './Select';
import SearchBox from './SearchBox';


class FilterHolder extends Component {
     constructor(props){
        super(props);
        this.state = { filterKeysAndValuePairs: []};
        this.addNewFilterPair = this.addNewFilterPair.bind(this);
    }


    addNewFilterPair(newKeyValuePair){
        let t = this;
        const prom = () => new Promise(function(resolve, reject) {
            const arr = t.state.filterKeysAndValuePairs;
            try {
                switch(newKeyValuePair[0][1] !== null || ''){
                    case true:
                        const filtered = arr.filter((item) =>{
                            return item[0][0] !== newKeyValuePair[0][0] 
                        })
                        const extendedArr = [...filtered, newKeyValuePair];
                        resolve(t.setState({filterKeysAndValuePairs: extendedArr}));
                        break
                    default:
                        const filteredWithNull = arr.filter((item) =>{
                            return item[0][0] !== newKeyValuePair[0][0] 
                        })
                        resolve(t.setState({filterKeysAndValuePairs: filteredWithNull}));
                        break    
                }
            }
            catch (e) {
                reject(e)
            }
        })
        return prom()
        .then(() => t.props.getFilterPairs(t.state.filterKeysAndValuePairs)
        );
    }


    getSingleContentDataRow(row){
        const singleRow = this.props.contentData.map((item) => {
            return item[row]
        })
        return singleRow
    }
    
    render(){
        return(
            <div>
                 <SearchBox contentData = { this.props.contentData }  keyPropertyName='title' addNewFilterPair={this.addNewFilterPair} />
                 <Select contentData={this.getSingleContentDataRow('state')} label='State' keyPropertyName='state' addNewFilterPair={this.addNewFilterPair} />
                 <Select contentData={this.getSingleContentDataRow('footer')} label='Footer' keyPropertyName='footer' addNewFilterPair={this.addNewFilterPair} />
            </div>
        )
    }
}

const style = {
};


export default FilterHolder

