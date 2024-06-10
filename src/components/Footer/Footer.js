import styled from 'styled-components';
import { Link } from "react-router-dom"
import Logo from '../Logo/logo';
import { useCookies } from 'react-cookie';


const Container = styled.footer`
color:white;
width:100%;
display:flex;
align-items:center;
justify-content:center;
background-color:black;

`
const Content = styled.div`
width:80%;
`
const Header = styled.div`
gap:1rem;
width:100%;
display: flex;
padding:2rem 0;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
border-bottom: 2px solid rgba(255,255,255,0.5);
`
const Company = styled.p`
font-size:1rem;
margin:0;
`
const Socials = styled.div`
gap:1rem;
display: flex;
align-items: center;
`
const SocialMedia = styled.a`
width:28px;
height:28px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
text-decoration: none;
background:blue;
`
const LinkedInIcon = styled.i`
color:white;
font-size: 1rem;
`
const GithubIcon = styled.i`
color:black;
font-size: 1.1rem;
`
const Body = styled.div`
width:100%;
padding:4rem 0;
display: flex;
gap:max(2rem, 10%);
flex-wrap: wrap;
`
const Column = styled.div`
display:flex;
flex-direction: column;
align-items:flex-start;
gap:1rem;
`
const Title = styled.p`
color:white;
margin: 0;
font-weight: 600;
`
const ElementsContainer = styled.div`
display:flex;
flex-direction: column;
align-items:flex-start;
gap:.75rem;
`
const Element = styled(Link)`
opacity: .7;
color:white;
text-decoration: none;
transition: color .3s, opacity .3s;
&:hover{
	color:orange;
	opacity: 1;
}
`
const Email = styled.a`
opacity: .7;
color:white;
text-decoration: none;
transition: color .3s, opacity .3s;
&:hover{
	color:orange;
	opacity: 1;
}
`
const AboutMe = styled.p`
margin:0;
opacity:.7;
width:200px;
`
const ABOUT_ME = "Full-stack developer passionate about crafting elegant solutions. Expertise in Django, Larvel, React js and much more. Let's connect!"
export default function Footer(){
	const [cookies, setCookies] = useCookies();

	return(
		<Container>
			<Content>
				<Header>
					<Logo />
					<Company>© 1982-2025 AFLIX</Company>
					<Socials>
						<SocialMedia><LinkedInIcon className="fa-brands fa-linkedin-in"/></SocialMedia>
						<SocialMedia rel="noopener noreferrer" target="_blank" href="https://github.com/AbbassAshmar" style={{background:"white"}}><GithubIcon className="fa-brands fa-github"/></SocialMedia>
					</Socials>
				</Header>
				<Body>
					<Column>
						<Title>About me</Title>
						<AboutMe>
							{ABOUT_ME}
						</AboutMe>
					</Column>
					<Column>	
						<Title>Navigation</Title>
						<ElementsContainer>
							<Element to={"/home"}>Home</Element>
							<Element to={`/user/${cookies.username}`}>User</Element>
							<Element to={"/movies"}>All Movies</Element>
							<Element to={"/top-imdb"}>Top IMDB</Element>
							<Element to={'/favorites'}>Favorites</Element>
						</ElementsContainer>
					</Column>
					<Column>	
						<Title>Skills set</Title>
						<ElementsContainer>
							<Element>Django</Element>
							<Element>Laravel</Element>
							<Element>React js</Element>
							<Element>Docker</Element>
							<Element>System Design</Element>
						</ElementsContainer>
					</Column>
					<Column>
						<Title>Contact me</Title>
						<ElementsContainer>
							<Element>+961 81 685 867</Element>
							<Email rel="noopener noreferrer" target="_blank" href="mailto:abbassa.ashmar@gmail.com">abbassa.ashmar@gmail.com</Email>
						</ElementsContainer>
					</Column>
				</Body>
			</Content>
		</Container>
	)
}