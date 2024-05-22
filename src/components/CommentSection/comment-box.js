import styled from "styled-components";
import ProfilePicture from "../ProfilePicture/profile-picture";

const Container = styled.div`
gap:1rem;
width:100%;
display: flex;
align-items: flex-start;
`
const UserProfilePicture = styled.div`
width:57px;
height:57px;
border-radius:17px;
`
const Picture = styled.img`
width:100%;
height:100%;
object-fit: cover;
border-radius:17px;
`
const Content = styled.div`
gap:1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
`
const DetailsContainer = styled.div`
width:100%;
display: flex;
align-items:center;
justify-content: space-between;
`
const UsernameContainer= styled.div`
gap:.25rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Username = styled.div`
color:orange;
font-size:1rem;
`
const CreatedAt = styled.div`
color:#A8AAAE;
font-size:14px;
`
const SettingsContainer = styled.div`

`
const SettingsList = styled.div`

`
const SettingsOption = styled.div`

`
const TextContainer = styled.div`
gap:.5rem;
color:white;
display: flex;
max-width:600px;
flex-direction: column;
align-items: flex-start;
`
const InteractionsContainer = styled.div`
gap:1rem;
display: flex;
align-items: center;
`
const LikeDislikeButton = styled.button`
gap:.5rem;
color:white;
display:flex;
font-size: 14px;
align-items: center;
`
const ReplyButton= styled.div`
color:white;
font-size:14px;
`

const settingsList = [{name : <span>Edit</span>, icon : <i className="fa-solid fa-clock"/>}, {name: <span>Delete</span>, icon : <i className="fa-solid fa-fire"/>}];

export default function CommentBox({text, user, createdAt,  likes, dislikes, id}){
    return(
        <Container>
            <UserProfilePicture>
                <Picture src={user.pfp} alt={`${user.id}-profile`}/>
            </UserProfilePicture>

            <Content>
                <DetailsContainer>
                    <UsernameContainer>
                        <Username>alex-jefferson</Username>
                        <CreatedAt>12-12-2024</CreatedAt>
                    </UsernameContainer>
                    <SettingsContainer>
                        <i className="fa-solid fa-ellipsis-vertical"/>
                        <SettingsList>
                            {settingsList.map(option=>(
                                <SettingsOption>
                                    {option.icon}
                                    {option.name}
                                </SettingsOption>
                            ))}
                        </SettingsList>
                    </SettingsContainer>
                </DetailsContainer>
                <TextContainer>
                    amazing sht lorem psuidjfsoj jadjflk jaidfn 
                    asiodfjoiwjqojfsiojdfiojasiofj iojasioj oifajsoid jiewjfwj 09dsjij i fukcing handleLogout
                    jwers are bad jews suck this life suck al nasr lil eslma
                </TextContainer>

                <InteractionsContainer>
                    <LikeDislikeButton>
                        <i className="fa-regular fa-thumbs-up"/>
                        <span>34</span>
                    </LikeDislikeButton>
                    <LikeDislikeButton>
                        <i className="fa-regular fa-thumbs-down"/>
                        <span>34</span>
                    </LikeDislikeButton>
                    <ReplyButton>Reply</ReplyButton>
                </InteractionsContainer>
            </Content>
        </Container>
    )
}