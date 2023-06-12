import styled from "styled-components";
import { Link } from "react-router-dom";

const Genre = styled(Link) `
text-decoration:none;
cursor:pointer;
color:white;
transition: color .2s;

&:hover{
    color:orange;
}
`
function GenresList({genres}){
    return (
        <div>
            {
            genres?
            genres.map((genre)=>{
                return <Genre to={`/movies/?genre=${genre}`} key={genre}>
                            {genre}
                        </Genre>
            }):
            'N/A'
            }
        </div>
    )
}

export default GenresList;