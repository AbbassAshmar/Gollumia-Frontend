import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import CarouselElement from "./carousel-element";

const Container = styled.div`
width:100%;
overflow: hidden;
position: relative;
`
const ElementsContainer = styled.div`
display: flex;
justify-content: flex-start;
width: fit-content;
transition:${({$transition})=>$transition};
`
const Navigate = styled.div`
position:absolute;
display: flex;
gap:.75rem;
bottom:4.5rem;
right:2rem;
z-index:20;
`
const NavgateButton = styled.div`
width:32px;
height:38px;
cursor:pointer;
background:rgba(192,195,199,.7);
border-radius: 6px;
display: flex;
align-items:center;
justify-content: center;
font-weight:700;
transition: background-color .3s;
&:hover{
    background-color: orange;
}
`
export default function Carousel(){
    const [latestMovies, setLatestMovies] = useState([]);
    const [currentElement, setCurrentElement] = useState(0);

    // Right : 0 true, 1 false , Left : 2 true, 3 false, IDLE = 4
    const [activateAnimation, setActivateAnimation] = useState(4);

    useEffect(()=>{
        fetchLatestMovies()
    },[])

    useEffect(()=>{
        let timer = setInterval(handleNavigateRight,3000);
        return () => {
            clearTimeout(timer);
        }; 
    },[activateAnimation]) //activateAnimation in useEffect wont change 

    useEffect(()=>{
        let timer1, timer2 = null;

        // false and left
        if(activateAnimation == 3){
            setLatestMovies((prev)=> { 
                let last=  prev[prev.length - 1]
                return [last, ...prev.slice(0,-1)] 
            });
    
            setCurrentElement(1);
            timer1 = setTimeout(()=>{
                setActivateAnimation(prev => 2);
            }, 100)
        }

        // true and left
        if (activateAnimation == 2){
            setCurrentElement(0);
            timer2 = setTimeout(()=>{
                setActivateAnimation(prev=> 4)
            },300)
        }

        return ()=>{
            if (timer1) clearTimeout(timer1);
            if (timer2) clearTimeout(timer2);
        }
    },[activateAnimation])

    useEffect(()=>{
        let timer1, timer2 = null;

        // true and right
        if(activateAnimation == 0){
            setCurrentElement(1);
            timer1 = setTimeout(()=>{
                setActivateAnimation(prev=> 1); 
            },300)
        }

        // false and right
        if (activateAnimation == 1){
            timer2 = setLatestMovies((prev)=> { 
                let first=  prev[0]
                return [...prev.slice(1,undefined), first] 
            })
    
            setCurrentElement(0)
            setActivateAnimation(prev=>4) // idle
        }

        return ()=>{
            if (timer1) clearTimeout(timer1);
            if (timer2) clearTimeout(timer2);
        }
    },[activateAnimation])

    useEffect(()=>{console.log(activateAnimation)},[activateAnimation])

    function handleNavigateRight(){
        if (activateAnimation == 4) {// idle
            setActivateAnimation(prev => 0); // true right
        }
    }

    function handleNavigateLeft(){
        if (activateAnimation == 4){
            setActivateAnimation(prev => 3); //false left
        }
    }

    const isAnimationActive = activateAnimation == 0 || activateAnimation == 2;

    async function fetchLatestMovies(){
        const URL =`${process.env.REACT_APP_API_URL}/api/movies/latest/?limit=5`;
        const request = await fetch(URL);
        const response = await request.json()

        if(request.status == 200)
        setLatestMovies(response.data.movies)
    }

    // right
    // activate animation
    // move to 1 
    // deactivate animation 
    // transfer first element to the end
    // move to 0

    // left
    // deactivate animation
    // transfer last element to the beginning
    // move to 1
    // activate animation
    // move to 0 

    return(
        <Container>
            <ElementsContainer $transition={isAnimationActive?"transform .3s" : "none"} style={{transform:`translateX(-${currentElement * 100}vw)`}}>
                {latestMovies.length > 0 && latestMovies.map(movie=>(
                    <CarouselElement key={movie.id} movie={movie} /> 
                ))}
            </ElementsContainer>
            <Navigate>
                <NavgateButton onClick={handleNavigateLeft}><i className="fa-solid fa-angle-left"/></NavgateButton>
                <NavgateButton onClick={handleNavigateRight}><i className="fa-solid fa-angle-right"/></NavgateButton>
            </Navigate>
        </Container>
    )
}