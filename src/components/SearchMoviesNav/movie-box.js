import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    padding-top:2px;
    width:100%;
    border:1px solid black;
    height:12vh;
    text-decoration:none;
    overflow:hidden;
    cursor:pointer;
    &:hover{
        background: rgba(0,0,0,0.6);
    }
`

const Container = styled.div`
    display:flex;
    gap:10px;
    align-items:start;
`
const Poster = styled.img`
    width:30px;
    flex:1;
    margin:0;
    transform: scale(.7) translateY(-10px);
  
`
const Elements = styled.div`
    flex:3;
    align-self: center;
    margin-bottom: 20px;
    display:flex;
    flex-direction:column;
    gap:10px;
    overflow:hidden;
`
const Title =  styled.h2`
    font-size: .9rem;
    margin: 0;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 170px;
`
const Others = styled.div`
    margin:0;
    display:flex;
    gap:10px;

`

const ListItems = styled.p`
    font-size:.8rem;
    margin:0;
    color:grey;
    
`
function MovieBox(props){
    return (
        <StyledLink to={`/movies/${props.id}`}>
            <Container>
                <Poster src={props.poster} />
                <Elements>
                    <Title>{props.title}</Title>
                    <Others>
                        <ListItems>{props.released} <span style={{marginLeft:'7px'}}>|</span></ListItems> 
                        <ListItems>
                            {props.duration}
                            <span style={{fontSize:".7rem"}}>m</span>
                            <span style={{marginLeft:'7px'}}>|</span>
                        </ListItems>
                        <ListItems>{props.imdb}<span  style={{fontSize:".7rem"}}>/10</span></ListItems>
                    </Others>
                </Elements>
            </Container>
        </StyledLink>
    )
}

export default MovieBox;