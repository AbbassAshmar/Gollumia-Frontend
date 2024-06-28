import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Up from "../../../photos/Up.jpg";
import ParallaxMovieCard from "../components/parallax-movie-card";
import { motion, useScroll, useTransform } from "framer-motion";
import curvedArrow from "../../../photos/curvedArrow.png";
import useWindowDimensions from "../../../hooks/use-window-dimensions";

const Container = styled.div`
width:100%;
display: flex;
align-items: center;
flex-direction: column;
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
@media screen and (max-width:1024px){
    width:45%;
}
@media screen and (max-width:930px){
    margin-top: 0%;
}
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
    @media screen and (max-width:768px) {
        top: 60%;
        left: 20%;
    }
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
margin-bottom:1rem;
font-size: var(--heading-3);
font-weight: bold;
position: relative;
letter-spacing: -0.01em;
padding-bottom: calc(1rem + 4px);
&::before{
    content:"";
    width:25%;
    height:4px;
    position:absolute;
    bottom:0;
    left:0;
    background-color: var(--main-color);
}
@media screen and (max-width:1024px){
    font-size: var(--heading-4);
}
@media screen and (max-width:500px){
    font-size: var(--heading-3-mobile);
}
`
const Subtitle = styled.h6`
margin:0;
padding:0;
color:var(--main-color);
font-size: var(--heading-6);
letter-spacing: 0.02em;
@media screen and (max-width:1024px){
    font-size: var(--heading-6-mobile);
}
@media screen and (max-width:500px){
    font-size: var(--heading-6-mobile);
}
`
const Subtitle2 = styled.h6`
margin:0;
padding:0;
color:#D0D0D0;
font-size: var(--heading-6);
line-height: 26px;
letter-spacing: 0.02em;
@media screen and (max-width:1024px){
    font-size: var(--heading-6-mobile);
}
@media screen and (max-width:500px){
    font-size: var(--heading-6-mobile);
}
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
@media screen and (max-width: 1024px){
    display: none;
}
`
const MovieCardsContainer = styled.div`
width:50%;
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
const MovieCardsRow2 = styled(MovieCardsRow)`
width:50%; 
z-index:4;
margin:-20% 0%;
transform:translate(20%,0);
@media screen and (max-width:900px){
    margin:-8% 0;
}
@media screen and (max-width:768px){
    margin:-20% 0;
}
`
const MovieCardContainer = styled.div`
flex:1;
z-index:1;
`
const BigImageWrapper = styled.div`
width:100%;
overflow: hidden;
display:flex;
align-items: center;
justify-content:center;
`
const BigImageContainer = styled.div`
flex:0 0 130%;
z-index:2;
overflow: hidden;
position: relative;
will-change: transform;
@media screen and (max-width:768px){
    flex: 0 0 180%;
}
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
    const {width} = useWindowDimensions();
    const [trendingMovies, setTrendingMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/trending/?limit=3`;
        fetchTrendingMovies(URL);
    },[])

    async function fetchTrendingMovies(url){
        try{
            const request = await fetch(url);
            if (request &&  request.status == 200){
                const moviesList = await request.json()
                setTrendingMovies(moviesList.data.movies)
            }
        }catch(error){
            setTrendingMovies([])
        }
        
        setIsLoading(false);
    }

    const bigImageContainerRef = useRef();
    const {scrollYProgress} = useScroll({
        target : bigImageContainerRef,
        offset : ['start end' , 'end start']
    })

    const bigImageContainerY = useTransform(scrollYProgress, [0,1], width > 800 ? ['0%', '-10%'] : ['0%', '-5%']);
    const bigImageY = useTransform(scrollYProgress, [0,1], width > 800 ? ['-6%', '28%'] : ['-3%', '14%']);
    const bigImageScale = useTransform(scrollYProgress, [0.2,0.9], width > 800 ? [1.25, 1.15] : [1.15, 1.1]);

    const contentContainerRef = useRef();
    const {scrollYProgress:contentScrollYProgress} = useScroll({
        target : bigImageContainerRef,
        offset : ['start end' , 'end start']
    })

    const contentY = useTransform(contentScrollYProgress, [0,1], ['0%', '30%']);

    const divideByTwo = (arr) => (
        arr.map(value => {
            const match = value.match(/^(-?\d+\.?\d*)(.*)$/);
            if (match) {
                const number = parseFloat(match[1]);
                const unit = match[2];
                const halvedNumber = number / 2;
                return `${halvedNumber}${unit}`;
            }
            return value; 
        })
    )

    const renderMovieCard = (movie, isLoading, style, imageY, containerY) => {
        if (width > 800){
            imageY = divideByTwo(imageY)
            containerY = divideByTwo(containerY)
        }

        return (
            <MovieCardContainer style={style}>
                <ParallaxMovieCard isLoading={isLoading} movie={movie} posterOnly={true} imageY={imageY} containerY={containerY}/>
            </MovieCardContainer>
        )
    }

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
                        {renderMovieCard(trendingMovies[0], isLoading, {transform:'translate(0,10%)'},['-15%','20%'], ['20%','-10%'])}
                        {renderMovieCard(trendingMovies[1], isLoading, {}, ['-15%','15%'], ['18%','-18%'] )}
                    </MovieCardsRow>
                    <MovieCardsRow2>
                        {renderMovieCard(trendingMovies[2], isLoading, {}, ['-23%','23%'], ['0%','-20%'])}
                    </MovieCardsRow2>
                </MovieCardsContainer>
            </ContentContainer>
            <BigImageWrapper>
                <BigImageContainer as={motion.div} ref={bigImageContainerRef} style={{y:bigImageContainerY}}>
                    <BigImage src={Up} as={motion.img} style={{y:bigImageY, scale:bigImageScale}}/>
                </BigImageContainer>
            </BigImageWrapper>

        </Container>
    )
}