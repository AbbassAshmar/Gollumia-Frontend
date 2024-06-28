import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import CarouselElement from "./carousel-element";
import { useCookies } from "react-cookie";

import deadPool from "../../photos/deadPool.jpg";
import barbie from "../../photos/barbie.jpg";
import lordOfTheRings from "../../photos/lordOfTheRings.jpeg";


// slide right
// activate animation
// move to 1 
// deactivate animation 
// transfer first element to the end
// move to 0

// slide left
// deactivate animation
// transfer last element to the beginning
// move to 1
// activate animation
// move to 0 


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
@media screen and (max-width:500px){
    bottom:1rem;
    right:1rem;
}
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

const QUOTES = [
    {
        quote : `"She thinks I'm a fascist? I don't control the railways or the flow of commerce!"`,
        by : 'Barbie in Barbie (2023)',
        image : barbie,
        id:1,
    },
    {
        quote : `"That still only counts as one!"`,
        by : `Gimli in The Lord of the Rings: The Return of the King (2003)`,
        image : lordOfTheRings,
        id:2,
    },
    {
        quote : `"Looks are everything. You ever heard David Beckham speak? It's like he mouth-sexed a can of helium. Think Ryan Reynolds got this far on his superior acting method?"`,
        by : 'Wade Wilson in Deadpool (2016)',
        image : deadPool,
        id:3,
    }
]

export default function Carousel(){
    const [cookies, setCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(true);
    const [carouselMovies, setCarouselMovies] = useState([]);
    const [currentElement, setCurrentElement] = useState(0);
    
    // Right : 0 true, 1 false , Left : 2 true, 3 false, IDLE = 4
    const [activateAnimation, setActivateAnimation] = useState(4);

    useEffect(()=>{
        fetchCarouselMovies()
    },[])

    useEffect(()=>{
        let timer = setInterval(handleNavigateRight,5000);
        return () => {
            clearTimeout(timer);
        }; 
    },[activateAnimation]) //activateAnimation in useEffect wont change 

    useEffect(()=>{
        let timer1, timer2 = null;

        // false and left
        if(activateAnimation == 3){
            setCarouselMovies((prev)=> { 
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
            timer2 = setCarouselMovies((prev)=> { 
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

    async function fetchCarouselMovies(){
        const URL =`${process.env.REACT_APP_API_URL}/api/movies/slider/?limit=5`;
        const INIT = {
            method:"GET",
            headers:{
                "Authorization":"Token " + cookies.token,
                "content-type":"application/json"
            },
        }

        try{
            const request = await fetch(URL,INIT);
            const response = await request.json()

            if(request.status == 200){
                if (response.data.movie && response.data.movies.length > 0)
                setCarouselMovies(response.data.movies);
                else setCarouselMovies(QUOTES);
            }else{
                setCarouselMovies(QUOTES);
            }
        }catch(error){
            setCarouselMovies(QUOTES);
        }

        setIsLoading(false);
    }


    if (isLoading)
    return(
        <Container>
            <CarouselElement isLoading={true} />
        </Container>
    )

    return(
        <Container>
            <ElementsContainer $transition={isAnimationActive?"transform .3s" : "none"} style={{transform:`translateX(-${currentElement * 100}vw)`}}>
                {carouselMovies.length > 0 && carouselMovies.map((movie,index)=>(
                    <CarouselElement isQuote={movie.quote != undefined} key={movie?.id || index} movie={movie} /> 
                ))}
            </ElementsContainer>
            <Navigate>
                <NavgateButton onClick={handleNavigateLeft}><i className="fa-solid fa-angle-left"/></NavgateButton>
                <NavgateButton onClick={handleNavigateRight}><i className="fa-solid fa-angle-right"/></NavgateButton>
            </Navigate>
        </Container>
    )
}