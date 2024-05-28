import styled from "styled-components";
import {Link} from "react-router-dom";
import { useState } from "react";
import useGetGenres from "../../hooks/use-get-genres";

const Container = styled.div`
top:0;
left:0;
height:100vh;
z-index: 120;
display: flex;
overflow:hidden;
position:absolute;
transition:width .3s;
width:${({$show})=>$show ? "100%" : "0"};
`
const Content = styled.div`
flex:4;
height: 100%;
background-color:black;
padding:1rem;
display: flex;
flex-direction: column;
gap: 2rem;
align-items: flex-start;
`
const BluredBackground = styled.div`
flex:1;
height: 100%;
background-color: rgba(0,0,0,0.6);
transition: ${({$show})=> $show ? "opacity .3s .3s" : "opacity .1s"};
opacity: ${({$show})=> $show ? "1" :  "0"};
@media screen  and (max-width:400px){
    flex:0;
}
`
const CloseButton = styled.button`
background-color:orange;
padding:.25rem 1.25rem;
border-radius: 40px;
font-weight:500;
font-size:14px;
`
const StyledLink = styled(Link)`
width:100%;
color:white;
text-decoration: none;
`
const GenresContainer = styled.div`
width:100%;
`
const GenresListTitle = styled.div`
width:100%;
color:white;
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 1.5rem;
`
const PlusIcon = styled.i`
font-size:14px;
padding: 0.25rem;
border-radius: 4px;
background-color: orange;
`
const GenresList = styled.div`
width:100%;
overflow:hidden;
transition:max-height .3s;
max-height: ${({$show})=> $show ? "100vh" :  "0"};
`
const GenresListContent = styled.div`
width:100%;
gap: 1.5rem;
padding:1rem;
display: flex;
flex-wrap:wrap;
min-width:70vw;
overflow:hidden;
border-radius: 8px;
background-color:orange;
box-shadow: inset 0 0 10px rgba(0,0,0,0.4);
`
const GenreLink = styled(Link)`
color:white;
text-decoration: none;
`

export default function SideNavigation({show, setShow}){
    const genres = useGetGenres();
    const [showGenresList, setShowGenresList] = useState(false);

    function closeSideNavigation(){
        setShow(false);
    }

    function openGenresList(){
        setShowGenresList(!showGenresList)
    }

    return(
        <Container $show={show}>
            <Content>
                <CloseButton onClick={closeSideNavigation}>
                    <i style={{marginRight:'.25rem'}} className="fa-solid fa-xmark"/>
                    Close
                </CloseButton>
                <StyledLink to={"/home"}>Home</StyledLink>
                <StyledLink to={'/movies'}>Movies</StyledLink>
                <StyledLink to={'/movies/top-imdb/'}>Top Imdb</StyledLink>
                <GenresContainer>
                    <GenresListTitle>
                        <p style={{margin:"0"}}>Genre</p>
                        <PlusIcon onClick={openGenresList} className="fa-solid fa-plus"/>
                    </GenresListTitle>
                    <GenresList $show={showGenresList}>
                        <GenresListContent>
                        {genres.length>0 && genres.map((genre)=>(
                            <GenreLink key={genre.id} to={`/movies/?genre=${genre.name}`}>{genre.name}</GenreLink>
                        ))}
                        </GenresListContent>
                    </GenresList>
                </GenresContainer>
            </Content>
            <BluredBackground $show={show} onClick={closeSideNavigation}/>
        </Container>
    )
}