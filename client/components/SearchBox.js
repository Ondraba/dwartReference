import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';


class SearchBox extends React.Component {
    constructor (props) {
      super(props)
      this.state = { value: ''}
      this.keyPropertyName = this.props.keyPropertyName;

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
      this.setState({value: value})
      this.props.addNewFilterPair(this.sendKeyValuePairToFilterHolder(value))
    } 

    sendKeyValuePairToFilterHolder(val){
      let checkedVal = val == '' || val.length < 3 ? null : val
      const keyPropertyName = this.keyPropertyName;
      const keyPropertyValue = checkedVal;
      const newPair = [];
      return [...newPair, [keyPropertyName, keyPropertyValue]]
    }

   render(){
    return(
      <div style={style.searchBoxWrapper}>
        <ReactAutocomplete
          menuStyle = {style.menu}
          items={this.props.contentData}
          shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 && value !== ''}
          getItemValue={item => item.title}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item.title}
            </div>
          }
          value={this.state.value}
          onChange={e => this.handleChange(e.target.value)}
          onSelect={value => this.handleChange(value)}
        />
      </div>
     )
   } 
       
}

const style = {
  menu: {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '100%',
  overflow: 'auto',
  },
  searchBoxWrapper: {
    marginTop: '60px',
    marginLeft: '20px',
    borderColor: 'grey'
  }
}

export default SearchBox;