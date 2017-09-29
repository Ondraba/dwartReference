import React, { Component } from 'react';
import R from 'ramda';

const Overview = ({contentData}) => {

    function openContentData(){
      return contentData.map(({id, main}) => {
            return(
            <ul key={id}>
                <li className="collection-item">
                {main} 
                </li>
            </ul>
            )
        })
    } 

    function contentCount(){
        return R.length(contentData)
    }


    return(
     <div>
         {openContentData()}
         {contentCount()}
     </div>
    )
}
 

export default Overview;


