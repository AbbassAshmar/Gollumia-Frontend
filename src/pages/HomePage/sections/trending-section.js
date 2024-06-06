import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Up from "../../../photos/Up.jpg";
import ParallaxMovieCard from "../components/parallax-movie-card";
import { motion, useScroll, useTransform } from "framer-motion";
import curvedArrow from "../../../photos/curvedArrow.png";

const Container = styled.div`
width:100%;
overflow: hidden;
display: flex;
flex-direction: column;
align-items: center;
`
const ContentContainer = styled.div`
gap:3rem;
width:100%;
padding:0 2rem;
display: flex;
align-items: flex-start;
justify-content: space-between;
@media screen and (max-width:768px){
    padding:1rem;
    flex-direction: column;
}
`

const Content = styled.div`
width:40%;
gap:2rem;
display: flex;
margin-top: 7%;
flex-direction: column;
align-items: flex-start;
position:relative;
z-index: 1;
@media screen and (max-width:768px){
    width:100%;
}
&::before{
    content:"";
    opacity:.6;
    border-radius: 50%;;
    background-color: var(--main-color);
    filter:blur(200px);
    width:90%;
    height:90%;
    z-index:-1;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-60%,-60%);
}
`
const TextContainer = styled.div`
gap:1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Title = styled.h3`
color:white;
margin-bottom:2rem;
font-size: var(--heading-3);
font-weight: bold;
position: relative;
letter-spacing: -0.01em;
&::before{
    content:"";
    width:25%;
    height:4px;
    position:absolute;
    bottom:-1rem;
    left:0;
    background-color: var(--main-color);
}
`
const Subtitle = styled.h6`
margin:0;
padding:0;
color:var(--main-color);
font-size: var(--heading-6);
`
const Subtitle2 = styled.h6`
margin:0;
padding:0;
color:#D0D0D0;
font-size: var(--heading-6);
line-height: 26px;
letter-spacing: 0.02em;
`
const ViewTrendingButton = styled.button`
color:white;
padding:.5rem 1rem;
border-radius: 300px;
font-size: var(--body);
background-color: var(--main-color);
`
const Arrow = styled.img`
opacity: .7;
width:40%;
position:absolute;
bottom:-4rem;
right:0;
`
const MovieCardsContainer = styled.div`
width:40%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
@media screen and (max-width:768px){
    width:100%;
}
`
const MovieCardsRow = styled.div`
gap:2rem;
width:100%;
display: flex;
align-items: center;
justify-content: center;
`
const MovieCardContainer = styled.div`
flex:1;
z-index:1;
`
const BigImageContainer = styled.div`
width:120%;
overflow: hidden;
z-index:2;
position: relative;
will-change: transform;
`
const BigImage = styled.img`
width:100%;
height:100%;
object-fit: cover;
will-change: transform;
`

const subtitle = "May the Force be with you.";
const title = "See What's Hot Now Your Next Adventure Awaits.";
const subtitle2 = "Explore our curated selection of trending movies, showcasing the latest and most captivating collections.";

export default function TrendingSection(){
    const [trendingMovies, setTrendingMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/trending/?limit=3`;
        fetchTrendingMovies(URL);
    },[])

    async function fetchTrendingMovies(url){
        const request = await fetch(url);
        if (request.status == 200){
            const moviesList = await request.json()
            setTrendingMovies(moviesList.data.movies)
        }

        setIsLoading(false);
    }

    const bigImageContainerRef = useRef();
    const {scrollYProgress} = useScroll({
        target : bigImageContainerRef,
        offset : ['start end' , 'end start']
    })

    const bigImageContainerY = useTransform(scrollYProgress, [0,1], ['50px', '-160px']);
    const bigImageY = useTransform(scrollYProgress, [0,0.4,1], ['0px',"40px", '160px']);
    const bigImageScale = useTransform(scrollYProgress, [0.3,0.75,1], [1.2, 1,.97]);

    const contentContainerRef = useRef();
    const {scrollYProgress:contentScrollYProgress} = useScroll({
        target : bigImageContainerRef,
        offset : ['start end' , 'end start']
    })

    const contentY = useTransform(contentScrollYProgress, [0,1], ['0%', '30%']);

    const renderMovieCard = (movie, isLoading, style, imageY, containerY) => (
        <MovieCardContainer style={style}>
            {!isLoading && movie ? <ParallaxMovieCard movie={movie} posterOnly={true} imageY={imageY} containerY={containerY}/> : <ParallaxMovieCard isLoading={true} />}
        </MovieCardContainer>
    )

    return(
        <Container>
            <ContentContainer ref={contentContainerRef}>
                <Content as={motion.div} style={{y:contentY}}> 
                    <TextContainer>
                        <Subtitle>{subtitle}</Subtitle>
                        <Title>{title}</Title>
                        <Subtitle2>{subtitle2}</Subtitle2>
                    </TextContainer>
                    <ViewTrendingButton>View Trending</ViewTrendingButton>
                    <Arrow src={curvedArrow}/>
                </Content>
                <MovieCardsContainer>
                    <MovieCardsRow>
                        {renderMovieCard(trendingMovies[0], isLoading, {transform:'translate(0,10%)'}, ['-100px','20px'], ['140px','-140px'])}
                        {renderMovieCard(trendingMovies[1], isLoading, {}, ['50px','-20px'], ['-0px','20px'] )}
                    </MovieCardsRow>
                    <MovieCardsRow style={{margin: "-20% 0%", width:'50%', transform:"translate(20%,0)", zIndex:"4"}}>
                        {renderMovieCard(trendingMovies[2], isLoading, {}, ['-80px','20px'], ['140px','-140px'] )}
                    </MovieCardsRow>
                </MovieCardsContainer>
            </ContentContainer>
            <BigImageContainer as={motion.div} ref={bigImageContainerRef} style={{y:bigImageContainerY}}>
                <BigImage src={Up} as={motion.img} style={{y:bigImageY, scale:bigImageScale}}/>
            </BigImageContainer>
        </Container>
    )
}