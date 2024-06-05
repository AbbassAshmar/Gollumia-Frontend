import styled from "styled-components";
import horror from "../../../photos/horror.jpg";
import adventure from "../../../photos/adventure.jpg";
import action from "../../../photos/action.jpg";
import GenreBox from "../components/genre-box";

const Container = styled.section`
gap:2rem;
padding:2rem;
display: flex;
overflow-x: clip;
background-color:black;
align-items: flex-start;
justify-content: flex-start;
`
const Title =  styled.h4`
top:2rem;
z-index: 4;
color:var(--main-color);
position: sticky;
font-weight: bold;
font-size:var(--heading-4);
`
const GenresContainer = styled.div`
gap:5rem;
display: flex;
flex-direction: column;
`

const GENRES = [{id:1, name:"Horror", image:horror, colors:['#787270','#E6E3DD']},{id:1, name:"Action", image:action, colors:['#B04206','#FFB03A']},{id:1, name:"Adventure", image:adventure, colors:['#35A7D9','#5DB4CF']}]

export default function GenresSection(){
    
    return(
        <Container>
            <Title>Some Of the Popular Genres</Title>
            <GenresContainer>
                {GENRES.map((genre,index)=>(
                    <GenreBox style={{zIndex:`${GENRES.length - index}`}} key={genre.id} colors={genre.colors} name={genre.name} image={genre.image} />
                ))}
            </GenresContainer>
        </Container>
    )
}