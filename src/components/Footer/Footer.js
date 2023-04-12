import styled from 'styled-components';
import { Link } from "react-router-dom"
import SmBtn from "../../components/Button/SmBtn"


const Container = styled.div`
  padding-top:2rem;
  width:100%;
  display:flex;
  align-items:start;
  justify-content:center;
  color:white;
  background-color:black;

`

const ContentContainer = styled.div`
  width:95%;
  margin: 0 0 0 1rem;
  display :flex;
  flex-direction:column;
  align-items:start;
  @media (min-width:1050px) {
    width:50%;
  }
 

`
const  Content =styled.div`
  display:flex;
  justify-content:space-between;
  align-items:start;
  flex-wrap:wrap;
  margin:2rem 0 2rem 0;
  width:100%;
`


const SocialButtons = styled.div`
  align-self:start;
  transform:translateX(2.2rem);
  margin: 0 0 1rem 0;
  
`
const Ulcontainer = styled.div`
margin-left:0;
`

const Ul=styled.ul`
display:flex;
flex-direction:column;
align-items:start;
margin:.1rem;
margin-left:0;
padding:0;
`
const Li = styled.li`
list-style:none;
margin:.3rem;
margin-left:0;
color:white;
`
export default function App(){

  return(
    <Container>
      <ContentContainer>
        <Link style={{color:"white", marginTop:".4rem"}}>Questions?Contact Us</Link>
        <Content>
          <Ulcontainer>
            <Ul>
              <Li><Link style={{color:"white"}}>FAQ</Link></Li>
              <Li><Link style={{color:"white"}}>Investor Relation</Link></Li>
              <Li><Link style={{color:"white"}}>Privacy</Link></Li>
              <Li><Link style={{color:"white"}}>Help Center</Link></Li>
              <Li><Link style={{color:"white"}}>Jobs</Link></Li>
            </Ul>
          </Ulcontainer>
          <Ulcontainer>
            <Ul>
              <Li><Link style={{color:"white"}}>Cookie Preferences</Link></Li>
              <Li><Link style={{color:"white"}}>Legal Notices</Link></Li>
              <Li><Link style={{color:"white"}}>Account</Link></Li>
              <Li><Link style={{color:"white"}}>Ways to Watch</Link></Li>
            </Ul>
          </Ulcontainer>
          <Ulcontainer>
            <Ul>
              <Li><Link style={{color:"white"}}>Corporate Information</Link></Li>
              <Li><Link style={{color:"white"}}>Only on Aflix</Link></Li>
              <Li><Link style={{color:"white"}}>Media Center</Link></Li>
              <Li><Link style={{color:"white"}}>Terms of Use</Link></Li>
              <Li><Link style={{color:"white"}}>Contac Us</Link></Li>
            </Ul> 
          </Ulcontainer>
        </Content>
        <SocialButtons>
          <SmBtn small={true} icon="instagram" color="#ac2bac"/>
          <SmBtn small={true} icon="github" color="#333333"/>
          <SmBtn small={true} icon="linkedin-in" color="#0082ca"/>
          <SmBtn small={true} icon="facebook-f" color="blue"/>
        </SocialButtons>
      </ContentContainer>
    </Container>
  )


}