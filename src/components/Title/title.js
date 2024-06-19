import styled from 'styled-components'


const Text = styled.h3`
color:white;
width:fit-content;
font-weight:600;
padding-bottom : 9px;
font-size: var(--heading-3);
border-bottom: .25rem solid transparent;
border-image: linear-gradient(to right, rgba(249, 105, 14,1),rgba(0,0,0,0)) 0 0 100% 0;
@media screen and (max-width:800px) {
font-size: var(--heading-3-mobile);
}
`

function Title({text}){
    return (
        <Text>{text}</Text>
    )
}

export default Title;