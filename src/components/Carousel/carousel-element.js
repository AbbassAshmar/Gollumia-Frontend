import { useState } from "react";
import { Link } from "react-router-dom";
import styled, {keyframes} from "styled-components";
import useFavorites from "../../hooks/use-favorites";

export const Container = styled.div`
text-decoration: none;
color:white;
background:url(${({$background})=>$background});
background-size:cover;
background-repeat: no-repeat;
background-position:center;
height: min(100vh, 1000px);
width:100vw;
display: flex;
align-items: flex-end;
justify-content: flex-start;
position: relative;
z-index: 2;
&::before{
    content:"";
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-1;
    background:radial-gradient(circle, rgba(0,0,0,.4) 50%, rgba(0,0,0,.8) 100%);
}

@media screen and (max-width:800px){
    height: min(70vh, 700px);
}
`

export const ContentContainer=  styled.div`
padding:2rem;
padding-bottom: 4rem;
display: flex;
flex-direction: column;
align-items: flex-start;
gap:2.5rem;

@media screen and (max-width:500px){
   padding:2rem 1rem;
   padding-bottom: 4rem;
   gap:1rem;
}
`
const TextContainer = styled.div`
gap: 1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
@media screen and (max-width:500px){
   gap:.5rem;
}
`
const Title = styled.h2`
font-size: var(--heading-2);
font-weight:600;
letter-spacing: -0.05em;
margin:0;
border-left:4px solid orange;
padding-left:1rem;
text-shadow: 0px 0px 8px rgba(0,0,0,0.5);
@media screen and (max-width:800px){
    font-size: var(--heading-2-mobile);
}
@media screen and (max-width:500px){
    font-size: var(--heading-3-mobile);
}
`
const RatingAndGenres = styled.div`
gap:2rem;
display: flex;
align-items: center;
`
const Rating = styled.div`
gap:.5rem;
display: flex;
align-items: center;
text-shadow: 0px 0px 6px rgba(0,0,0,.9);
letter-spacing: 0.02em;
@media screen and (max-width:500px){
    font-size:var(--small-1);
}
`
const Genres = styled.div`
gap:.5rem;
text-align: center;
display: flex;
align-items: center;
flex-wrap: wrap;
text-shadow: 0px 0px 4px rgba(0,0,0,.9);
`
const Genre = styled(Link)`
text-decoration: none;
color:white;
transition:color .3s;
letter-spacing: 0.02em;
&:hover{
    color:orange;
}
@media screen and (max-width:500px){
    font-size:var(--small-1);
}
`
const Plot = styled.h5`
font-size:var(--body);
color:#C0C3C7;
margin:0;
max-width: 60%;
font-weight: 400;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
line-height: 1.3em;
letter-spacing: 0.02em;
text-shadow:0px 0px 6px rgba(0,0,0,0.8);
@media screen and (max-width:800px){
    display: none;
}
`
const ButtonsContainer = styled.div`
gap:1.5rem;
display: flex;
align-items: center;
justify-content: flex-start;
@media screen and (max-width:500px){
    gap:1rem;
}
`
const WatchNow = styled(Link)`
padding:.75rem 1.25rem;
font-size:var(--body);
background-color: orange;
color:black;
border-radius: 50px;
text-decoration: none;
font-weight: 700;
transition:background-color .3s;
&:hover{
    background-color: darkorange;
    color:black;
}
@media screen and (max-width:500px){
    padding:.5rem 1rem;
    font-size:var(--small-1);
}
`

const AddToFavorites = styled.button`
transition:color .3s;
font-size:var(--body);
font-weight: 700;
cursor:pointer;
&:hover{
    color:red;
}
&:hover i{
    color:red;
}
@media screen and (max-width:500px){
    font-size:var(--small-1);
}
`
const HeartIcon = styled.i`

`
export default function CarouselElement({movie, isLoading, isQuote}){
    const [addToFavoritesHover, setAddToFavoritesHover] = useState(false);
    const {addOrRemoveFavorite, isFavorite} = useFavorites(movie);

    function heartIconSolidOrRegular (){
        if (addToFavoritesHover) return "solid";
        if (isFavorite) return "solid";
        return "regular";
    }
   
    async function heartIconClick(e){
        addOrRemoveFavorite();
    }

    if(isLoading)
    return(
        <LoadingCarouselElement />
    )

    if(isQuote)
    return(
        <QuoteCarouselElement quote={movie}/>
    )   

    return(
        <Container $background={movie.image}>
           <ContentContainer>
                <TextContainer>
                    <Title>{movie.title}</Title>
                    <RatingAndGenres>
                        <Rating>
                            <i style={{color:"orange",textShadow:"none"}} className="fa-solid fa-star"/>
                            <span>{movie?.ratings?.imdb}</span>
                        </Rating>
                        <Genres>
                            {movie.genres?.length>0 && movie.genres.map((genre,index)=>(
                                <>
                                    <Genre key={genre.id} to={`/movies?genre=${genre.name}`}>{genre.name}</Genre>
                                    {index !== movie.genres.length - 1 && <span style={{cursor:"default"}}>.</span>}
                                </>
                            ))}
                        </Genres>
                    </RatingAndGenres>
                    <Plot>{movie.plot}</Plot>
                </TextContainer>
                <ButtonsContainer>
                    <WatchNow to={`/movies/${movie.id}`}>
                        <i style={{marginRight:'.5rem'}} className="fa-regular fa-circle-play"/>
                        Watch Now
                    </WatchNow>
                    <AddToFavorites onClick={heartIconClick} onMouseEnter={()=>setAddToFavoritesHover(true)}  onMouseLeave={()=>setAddToFavoritesHover(false)}>
                        <HeartIcon style={{marginRight:'.5rem'}} className={`fa-${heartIconSolidOrRegular()} fa-heart`}/>
                        Favorite
                    </AddToFavorites>
                </ButtonsContainer>
            </ContentContainer> 
        </Container>
    )
}



const pulseAnimation = keyframes`
0% {opacity: 0.5;}
100% { opacity: 1;}
`
const LoadingContainer = styled.div`
color: #fff; 
min-height:0;
background-color:black;
width: 100%;
display: flex;
align-items: flex-start;
padding:5rem 2rem 0 2rem;

@media screen and (max-width:800px){
    padding:5rem 1rem 0 1rem;
}
`
const LoadingAnimation = styled.div`
width: 100%;
height: 80vh; 
border-radius:8px;
background-color: var(--main-color); 
animation: ${pulseAnimation} 1s infinite alternate;
`

function LoadingCarouselElement(){
    return (
        <LoadingContainer>
            <LoadingAnimation/>
        </LoadingContainer>
    )
}



const QuoteText = styled.h5`
color:white;
font-size:var(--heading-5);
text-shadow: 0px 0px 8px rgba(0,0,0,0.5);

@media screen and (max-width:800px) {
    font-size: var(--heading-5-mobile);
}
`
const QuoteTeller = styled.h3`
color:var(--main-color);
font-size:var(--heading-3);
text-shadow: 0px 0px 8px rgba(0,0,0,0.5);
font-weight: bold;
@media screen and (max-width:800px) {
    font-size: var(--heading-3-mobile);
}
`

function QuoteCarouselElement({quote}){
    return(
        <Container $background={quote.image}>
            <ContentContainer style={{maxWidth:'700px'}}>
                <QuoteText>{quote.quote}</QuoteText>
                <QuoteTeller>{quote.by}</QuoteTeller>
            </ContentContainer>
        </Container>
    )
}