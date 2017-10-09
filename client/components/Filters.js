import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchContent from '../queries/fetchContent';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import Select from 'react-select';

class Filters extends Component {
    constructor(props){
        super(props);
        this.state = { title: '', main: '', header: '', footer: '', state: '', url: ''};
    }

    render(){
        return(
         <div></div>
        )
    }
}


const style = {
  wrapper: {
    width: 800,
    margin: 20,
  },
    paperStyle: {
    height: 500,
    width: 900,
    margin: 20,
    paddingTop: 20
  },
};


export default Filters;