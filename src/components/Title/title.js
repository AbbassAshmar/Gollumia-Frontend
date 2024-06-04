import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { motion ,useAnimate,useInView} from 'framer-motion'
import styled from 'styled-components'


const Container = styled.div`
display : flex;
width:100%;
margin:1.4rem 0 1.6rem 0;
justify-content:space-between;
color:white;
background:black;
align-items:center;
padding:3rem 0 0 2;
font-weight:600;
`

const Text = styled.h2`
color:orange;
font-weight:600;
border-bottom: 0.1px solid transparent;
border-image: linear-gradient(to right, rgba(249, 105, 14,1),rgba(0,0,0,0)) 0 0 100% 0;
padding-bottom : 9px;
`
const ViewAll = styled(Link)`
color:white;
font-weight:600;
font-size:1rem;
text-decoration: none;
transition: color .3s;
&:hover{
    color:orange;
}
`

function Title({viewall, ctg}){
    const [scope, animate]= useAnimate()
    const isInView = useInView(scope,{once:true})

    useEffect(()=>{
        if (isInView) animate(scope.current, {opacity:1, x:0})
    },[isInView])

    return (
        <Container as={motion.div} ref={scope} initial={{opacity:0, x:-20}}  >
            <Text>{ctg}</Text>
            {viewall && (
                <ViewAll to={`/movies/category/${ctg.toLowerCase()}/`} >
                    View all <i style={{marginLeft:".25rem"}} className="fa-solid fa-arrow-right"/>
                </ViewAll>
            )}
        </Container>
    )
}

export default Title;