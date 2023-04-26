import styled from "styled-components"

const Btn = styled.button`
    width: 6em;
    height: 1.8em;
    border-radius: 30em;
    font-size: 15px;
    font-family: inherit;
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    background:white;
    display:flex;
    gap:5px;
    align-items:center;
    justify-content:center;
    color:black;
                
    &:before{
        content: '';
        width: 0;
        height: 1.8em;
        border-radius: 30em;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right, orange 0%, #f9f047 100%);
        transition: .5s ease;
        display: block;
        z-index: -1;
    }
    &:hover:before{
        width: 6em;
    }
`

function NavButton(props){
    return(
        <Btn onClick={props.onClick}>
            <i style={{fontSize:".8em",marginTop:"3px"}} className="fa-sharp fa-solid fa-angle-left"></i> 
            <p style={{display:"inline-block",margin:"0"}}>Close</p>
        </Btn>
    )
}
export default NavButton;