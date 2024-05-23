import styled from "styled-components";
import Logo from "../Logo/logo";
import UserProfileOrSignIn from "./UserProfileOrSignIn/user-profile-or-sign-in";

const Container = styled.div`
@media screen and (min-width: 1024px) {
    display: none;
}
`

export default function SmallScreenNavbar(){

    return(
        <Container>
            <i className="fa-solid fa-bars"/>
            <Logo />
            <UserProfileOrSignIn />
        </Container>
    )
}