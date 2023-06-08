import {useCookies} from "react-cookie"
import styled from "styled-components"
import DefaultPfp from "./default-pfp"

const Div = styled.div`
    border-radius:50%;
    height :37px;
    margin-right:1px;
    width:37px;
    border:none;
`
const Container = styled.div`
    @media screen and (max-width:900px){
        transform:scale(.85);
    }
`
function Pfp(props){
    const [cookies, setCookies] = useCookies(["pfp"])
  
    const divStyle = {
        background:`url('${cookies.pfp}') center / cover`,
    }
    return (
    <Container style={props.style}>
        {   cookies.pfp != "null" && cookies.pfp? 
            <Div style={divStyle}>
            </Div> :
            <DefaultPfp letter={cookies.username[0]}/>
        }
    </Container>
    )
}

export default Pfp;