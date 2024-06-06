import styled from "styled-components";
import horror from "../../../photos/horror.jpg";
import adventure from "../../../photos/adventure.jpg";
import action from "../../../photos/action.jpg";
import GenreBox from "../components/genre-box";

const Container = styled.section`
gap:2rem;
width: 100%;
padding:2rem;
display: flex;
overflow-x: clip;
background-color:black;
align-items: flex-start;
justify-content: flex-start;
@media screen and (max-width:1024px) {    
    align-items: center;
    flex-direction: column;
}
@media screen and (max-width:768px) {
    padding:1rem;
}
`
const Title =  styled.h4`
top:2rem;
margin: 0;
padding:0;
z-index: 4;
position: sticky;
font-weight: bold;
color:var(--main-color);
font-size:var(--heading-4);
@media screen and (max-width:1024px) {
    width:100%;
    position: static;
    text-align: center;
}
@media screen and (max-width:768px) {
    font-size:var(--heading-4-mobile);
}
`
const GenresContainer = styled.div`
gap:5rem;
display: flex;
flex-direction: column;
@media screen and (max-width:1024px){
    gap:3rem;
}
@media screen and (max-width:728px){
    gap:2rem;
}
`

const GENRES = [{id:1, name:"Horror", image:horror, colors:['#787270','#E6E3DD']},{id:2, name:"Action", image:action, colors:['#B04206','#FFB03A']},{id:3, name:"Adventure", image:adventure, colors:['#35A7D9','#5DB4CF']}]

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