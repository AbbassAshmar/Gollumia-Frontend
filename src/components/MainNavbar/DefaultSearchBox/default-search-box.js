import styled from "styled-components";
import "../moviesNavbar.css"

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 35px;

@media screen and (max-width:900px){
    display:none;
}

`

const SearchInput = styled.input`
background-color: transparent;
    outline: none;
    border:none;
    border-bottom: 2px solid white;
    color:white;
    transform: translateY(-2px);

`

const Glass = styled.i`
    cursor:pointer;
    transform:scale(1);
    margin:0;
    color:white;
    padding: 5px;
`
function DefaultSearchBox(props){

    return (
        <form onSubmit={props.handleSearchSubmit}>
            {/* .search */}
            <Container > 
                <SearchInput  
                    onBlur={props.detectInputBlur}
                    onChange={props.handleSearchChange}
                    name="search-input" 
                    type="text" 
                    placeholder="search"
                />
                <Glass className="fa-solid fa-magnifying-glass" />     
            </Container>  
        </form>
        
    )

}

export default DefaultSearchBox;