import React from 'react';
import './Blocks.css';




function Block(props){
    return(
        <div style={{backgroundImage:`url(${props.place})`}} id={props.title} className="blockcontainer">
        </div>
    )

}

export default Block;