import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useCookies} from "react-cookie";

const Container = styled.div`
text-decoration: none;
color:white;
background:url(${({$background})=>$background});
background-size:cover;
background-repeat: no-repeat;
background-position:center;
min-height: 100vh;
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
`
const ContentContainer=  styled.div`
padding:2rem;
padding-bottom: 4rem;
display: flex;
flex-direction: column;
align-items: flex-start;
gap:2.5rem;
`
const TextContainer = styled.div`
gap: 1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Title = styled.h1`
font-size: 3rem;
font-weight:600;
letter-spacing: -0.05em;
margin:0;
border-left:4px solid orange;
padding-left:1rem;
text-shadow: 0px 0px 8px rgba(0,0,0,0.5);
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
`
const Genres = styled.div`
gap:.5rem;
display: flex;
align-items: center;
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
`
const Plot = styled.h5`
font-size:1rem;
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
`
const ButtonsContainer = styled.div`
gap:1.5rem;
display: flex;
align-items: center;
justify-content: flex-start;
`
const WatchNow = styled(Link)`
padding:.75rem 1.25rem;
font-size:1rem;
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
`

const AddToFavorites = styled.button`
padding:.5rem 1rem;
transition:color .3s;
font-size:1rem;
font-weight: 700;
cursor:pointer;
&:hover{
    color:red;
}
&:hover i{
    color:red;
}
`
const HeartIcon = styled.i`

`
export default function CarouselElement({movie}){
    const [addToFavoritesHover, setAddToFavoritesHover] = useState(false);
    const [cookies, setCookies] = useCookies(['token']);
    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if (isLoading)
        requestAddOrRemoveFavorite();
    },[isLoading])

    function heartIconSolidOrRegular (){
        if (addToFavoritesHover) return "solid";
        if (movie.is_favorite) return "solid";
        return "regular";
    }
   
    async function heartIconClick(e){
        if (!cookies.token) navigate('/login')
        setIsLoading(true)
    }

    async function requestAddOrRemoveFavorite(){
        const URL =`${process.env.REACT_APP_API_URL}/api/users/user/favorites/`;
        const INIT = {
            method:"POST",
            headers:{
                "Authorization":"Token " + cookies.token,
                "content-type":"application/json"
            },
            body:JSON.stringify({movie_id : movie.id})
        }

        const request = await fetch(URL,INIT);
        if (request.status == 200){
            movie.is_favorite= false;
        }

        if(request.status == 201){
            movie.is_favorite = true;
        }

        setIsLoading(false)
    }

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
                    <AddToFavorites disabled={isLoading} onClick={heartIconClick} onMouseEnter={()=>setAddToFavoritesHover(true)}  onMouseLeave={()=>setAddToFavoritesHover(false)}>
                        <HeartIcon style={{marginRight:'.5rem'}} className={`fa-${heartIconSolidOrRegular()} fa-heart`}/>
                        Add to favorites
                    </AddToFavorites>
                </ButtonsContainer>
            </ContentContainer> 
        </Container>
    )
}