import styled from "styled-components";
import "../moviesNavbar.css"

const Box = styled.div`
    display:none;
    position: absolute;
    width:95%;
    background-color: black;
    top:100%;
    z-index: 2;
    left:2.2%;
    overflow: hidden;
    height: 2.6rem;
    align-items: center;
    @media screen and (max-width:900px){
        display:${({displaySearchBar})=>displaySearchBar};
    }
`

const Content = styled.div`
    position: relative;
    width:100%;
    height: 100%;
    z-index: 3;

    &:focus{
        outline: none;
        border: none;
    }

`
const Input = styled.input`
    width: 100%;
    padding: 0 1.5rem 0 .2rem;
    height: 90%;
    font-size: .9rem;
`

const Glass = styled.i`
    position: absolute;
    top:25%;
    right:1%;
    font-size: .9rem;

`



function SearchBox(props){
    return(
        <Box displaySearchBar={props.displaySearchBar} className="search-box-simplified-container">
            <form onSubmit={props.handleSearchSubmit}>
                <Content className="search-box-simplified-content">
                    <Input
                        onChange={props.handleSearchChange}
                        name="search-input"
                        type="text"
                        placeholder="Searching..."
                    />
                    <Glass className="fa-solid fa-magnifying-glass"></Glass> 
                </Content>
            </form>     
        </Box>  
    )

}

export default SearchBox;