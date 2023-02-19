import {useCookies} from "react-cookie"
import styled from "styled-components"
import DefaultPfp from "./defaultPfp"

const Div = styled.div`
border:2px solid red;

width:3vw;
height:7vh;
border-radius:50%;
`

function Pfp(props){
    const [cookies, setCookies] = useCookies(["token"])
    console.log(cookies.token)
    const divStyle = {
        height :"37px",
        marginRight:"1px",
        width:"37px",
        borderRadius:"50%",
        border:"none",
        background:`url('http://127.0.0.1:8000${cookies.token[4]}')`,
        backgroundPosition:"center",
        backgroundSize:"cover",
    }
    return (
    <div>
        {   cookies.token[4] ? 
            <Div style={divStyle}>
            </Div> :
            <DefaultPfp letter={cookies.token[2][0]}/>
        }
    </div>
    )
}

export default Pfp;