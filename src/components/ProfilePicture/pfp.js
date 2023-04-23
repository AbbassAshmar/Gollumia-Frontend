import {useCookies} from "react-cookie"
import styled from "styled-components"
import DefaultPfp from "./defaultPfp"

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
    const [cookies, setCookies] = useCookies(["token"])
    console.log(cookies.token)
   
    const divStyle = {
        background:`url('http://127.0.0.1:8000${cookies.token[4]}')`,
        backgroundPosition:"center",
        backgroundSize:"cover",
    }
    return (
    <Container style={props.style}>
        {   cookies.token[4] ? 
            <Div style={divStyle}>
            </Div> :
            <DefaultPfp letter={cookies.token[2][0]}/>
        }
    </Container>
    )
}

export default Pfp;