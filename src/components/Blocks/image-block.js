import React, { useEffect } from 'react';
import './Blocks.css';
import { motion,useAnimate, useInView } from 'framer-motion';

function Block(props){
    
const blockAnimation ={
    initial:{
        x: props.left?-600:600,
        opacity:0,
    },
    animation:{
        x:[0],
        opacity:[1],
    },
    transition:{
        type:"tween",
        duration:0.02,
    }
}
    const [blockScope, animateBlock] = useAnimate()
    const isInView = useInView(blockScope)
    useEffect(()=>{
        console.log(isInView)
        if(isInView) animateBlock(blockScope.current, blockAnimation.animation,blockAnimation.transition)
    },[isInView])
    return(
        <motion.div 
            key={props.title}
            style={{backgroundImage:`url(${props.place})`}}
            id={props.title}
            className="blockcontainer"
            ref={blockScope}
            variants={blockAnimation} 
            initial="initial"
          
        />
    )

}

export default Block;