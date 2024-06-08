import styled from 'styled-components'


const Text = styled.h3`
color:white;
font-weight:600;
padding-bottom : 9px;
font-size: var(--heading-3);
border-bottom: 0.1px solid transparent;
border-image: linear-gradient(to right, rgba(249, 105, 14,1),rgba(0,0,0,0)) 0 0 100% 0;

`


function Title({text}){
    return (
        <Text>{text}</Text>
    )
}

export default Title;