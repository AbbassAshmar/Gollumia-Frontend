import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { motion ,useAnimate,useInView} from 'framer-motion'

function Title(props){
    const [scope, animate]= useAnimate()
    const isInView = useInView(scope,{once:true})
    useEffect(()=>{
        console.log(isInView)
        if (isInView) animate(scope.current, {opacity:1, x:0})
    },[isInView])

    const styles ={
        container:{
            display : "flex",
            width:"100%",
            margin:"1.4rem 0 1.6rem 0",
            justifyContent:"space-between",
            color:"white",
            background:"black",
            alignItems:"center",
            padding:"3rem 0 0 2 "
        },
        h2:{
            color:"orange",
            fontWeight:"100",
            borderBottom: "0.1px solid transparent",
            borderImage: "linear-gradient(to right, rgba(249, 105, 14,1),rgba(0,0,0,0)) 0 0 100% 0",
            paddingBottom : "9px"
        }
    }
    return (
        <motion.div ref={scope} initial={{opacity:0, x:-20}}  style={styles.container}>
            <h2 style={styles.h2}>{props.ctg}</h2>
            {!props.viewall?null :
            <Link to={`/movies/category/${props.ctg.toLowerCase()}/`} >View all <i className="fa-solid fa-circle-arrow-right"></i></Link>
            }
        </motion.div>
    )
}

export default Title;