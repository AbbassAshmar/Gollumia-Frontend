import FilterElementWrapper from "../FilterElementWrapper/filterelementwrapper";
import styled from "styled-components";

const Form = styled.form`
display:flex;
flex-direction:column;
width:80%;
margin:auto;
`
const Buttons = styled.div`
display:flex;
gap:5px;
align-self:flex-start;
width:20%;
margin:1rem 0;
`
const Submit= styled.button`
    background : orange;
    padding:.25rem 1rem ;
    border-radius:12px;
    font-size:.9rem;
    font-weight:300;
    color:white;
`
const CloseBtn = styled(Submit)`
background:white;
color:black;
`
function FilterMenu(props){
    const Genres = [
        "All",
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "Western"
    ];
    const Released= [
        "All",
        "Unreleased",
        "2023",
        "2022",
        "2021",
        "2020",
        "2019",
        "older"
    ]
    const Ratings= [
        "All","G","PG","PG-13","R","R+","Rx"
    ]
    

    async function requestFilteredMovies(url){
        const send_request = await fetch(url);
        const movies_list = await send_request.json();
        if (send_request.status == 200){
            console.log(movies_list)
            props.setMovies(movies_list.movies?movies_list.movies:[])
            
        }
    }
    
    function handleFilterSubmit(e){
        e.preventDefault();
        let url = "http://localhost:8000/api/movies/?"
        let formData = new FormData(e.currentTarget);
        for (const value of formData.entries()) {
            url += `${value[0]}=${value[1]}&`
        }
        //remove the last character (? or &)
        url = url.slice(0,-1)
        requestFilteredMovies(url)
        
    }
    return(
        <div style={{transition:"all 0.3s",maxHeight:`${props.isActive?"100vh":"0"}`,overflow:"hidden"}}>
            <div>
                <Form onSubmit={handleFilterSubmit}>
                    <div style={{width:"100%",margin:"auto"}}>
                        <FilterElementWrapper title="Released : " name="released" list={Released}/>
                        <FilterElementWrapper title="Rating : " name="contentRating" list={Ratings}/>
                        <FilterElementWrapper title="Genre : " name="genre" list={Genres}/>
                    </div>
                    <Buttons>
                        <Submit type="submit"><i className="fa-solid fa-filter"></i> Filter</Submit>
                        <CloseBtn type="button" onClick={()=>{props.setIsActive(!props.isActive)}}>
                            <i style={{marginRight:".2rem",}} className="fa-solid fa-xmark"></i>Close
                        </CloseBtn>
                    </Buttons>
                </Form>   
            </div>
        </div>
    )
}

export default FilterMenu;