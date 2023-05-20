import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import {useNavigate } from "react-router-dom"

// Client Id : 798671795051-c95amd54jght2rvvkbnqog71ilut2kch.apps.googleusercontent.com
// Client Secret : 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


const Button =styled.button`
background-color:#dd4b39;
height:40px;  
min-height:40px;
border-radius: 4px;
color:white;
border:0px transparent;  
text-align: center;
width: 150px;
min-width:82px;
&:hover{
    opacity:0.6;
}
`
function Google(){
    const [cookies, setCookies] = useCookies(["token"])
    let navigate = useNavigate()
    async function send_token(access_token){
        const res = await fetch(`http://127.0.0.1:8000/validate/`,{
            method:"GET",
            headers:
            {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            }
        })
        
        const resp = await res.json()
        if ((res.status==200  || res.status==201)&& res.ok == true){
            const token = resp.token ? resp.token : null
            setCookies("token", token, {path :"/"})
            setCookies("email", resp.user.email, {path :"/"})
            setCookies("username", resp.user.username, {path :"/"})
            setCookies("id", resp.user.id, {path :"/"})
            setCookies("pfp", resp.user.pfp, {path :"/"})
            navigate("/movies",{replace:true})
        }

    }
    const Success = (response)=>{
        send_token(response.access_token)
    }

    const Error = ()=>{
        console.log("Error")
    }
    const login = useGoogleLogin({
    onSuccess: Success,
    onError: Error,
    });


    return(
            <Button type='Button' onClick={() => login()}>
                <i style={{margin:"0 1px 0 2px"}} className="fa-brands fa-google"></i> Google
            </Button>
        )
}

export default Google;


//onClick , send a request the authorization endpoint in your backend, using django-Oauth-toolkit, it's /o/authorize/
// this request SHOULD contain client_id provide by google api console

// 1. A user in the React application initiates the OAuth 2.0 flow, such as by clicking a "Sign in with Google" button.
// 2. The React application sends a request to the Google API, including a client ID and redirect URI, to initiate the OAuth 2.0 flow.
// 3. The Google API prompts the user to grant access to their Google account, and the user grants access.
// 4. Google API returns an authorization grant in the form of a code to the redirect URI provided by the client.
// 5. The React application receives the authorization grant and sends it to the Django server.
// 6. The Django server validates the authorization grant, and if it is valid, it sends a request to the Google API to exchange the authorization grant for an access token.
// 7. The Google API validates the authorization grant and sends an access token to the Django server.
// 8. The Django server uses the access token to request user information from the Google API, such as the user's email and name.
// 9. The Django server validates the user information and creates a new user record in the database if the user doesn't already exist.
// 10. The Django server responds to the React application with a token that the React application can use to authenticate future requests to the Django server.
// 11. For further requests, The React application includes the token in the request headers, and the Django server verifies the token and serve the requested resources if it's valid.
// 12. Optionally, The React application can use the refresh token to request new access token without user interaction.


// 1. react sends a request to google api "https://accounts.google.com/o/oauth2/v2/auth" + client_id, scope, redirect_uri, response_type, and prompt specified , this step is taken care of 
// by useGoogleLogin() hook
// 2. google api returns authorizatoin grant to the uri after the user grants permission to access his info (in this case chooses his google account)
// the authorization grant in exhanged for an access token in the uri and the access_token is received by react onSuccess.
// 3. react sends it to the backend 
// to validate the token found in the response you receive ( the respose has this shape : 
// access_token :"ya29.a0AX9GBdVGW5i2o_sfEcy5tY9WVccbxyjfMpOULHS-9Rq2L-U0LPSfpNua7sJeMw-gmis8LEjc5xHR1RXQCDD4ykBSIO-FziQltjpD7fv2prR5Zpk07iz-6W8wIQi3QJsmvYjXDzxbgn8RMtgyaiMmjjaHatWn8QaCgYKAeYSARISFQHUCsbCveW5LN-91MZF1t6ce0WcIg0165
// authuser: "2"
// expires_in : 3599
// prompt: "none"
// scope: "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email"
// token_type : "Bearer)
// send the access_token to this endpoint "https://oauth2.googleapis.com/tokeninfo?access_token=<access_token>" google api takeinfo endpoint 
// you'll recieve : 
// {
//   "azp": "798671795051-c95amd54jght2rvvkbnqog71ilut2kch.apps.googleusercontent.com",
//   "aud": "798671795051-c95amd54jght2rvvkbnqog71ilut2kch.apps.googleusercontent.com",
//   "sub": "115348781952301340290",
//   "scope": "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
//   "exp": "1673496985",
//   "expires_in": "1688",
//   "email": "abbass.babass10@gmail.com",
//   "email_verified": "true",
//   "access_type": "online"
// }
// check "aud", it should be equal to your clien_ID
// check the email_verified : should be true
// check the expires_in , shouldn't be expired
// validation should be made in the backend
// 3. the user info are obtained from response = requests.get("https://oauth2.googleapis.com/tokeninfo?id_token=<token>",
//  headers={"Authorization": "Bearer <access_token>"}) sent from django 
// 4. django responds with a token after validation and creation of the user with a randomly genrated pass
// 6. the token is used in other requests 

//  using '@react-oauth/google' in frontend and django-oauth-toolkit in backend,
//  onclick redirects the user automatically to the google sign in page 
//  the credentials needed by the google api are already found in the developer console project created previously
//  the redirect uri , is found also in the developer console, after the user chooses his account to login , the user is redirected to this 
//  uri with needed data (authorization grant) ,and then the endpoint responds with a access_token to be validated in the backend and exchanged
//  with an authorization token or jwt.
//  the access toke can be used alone without exchanging it for authorization token , and ProtectedResourceView is used to protect the view .

// +--------+                               +---------------+
// |        |--(A)- Authorization Request ->|   Resource    |
// |        |                               |     Owner     |
// |        |<-(B)-- Authorization Grant ---|               |
// |        |                               +---------------+
// |        |
// |        |                               +---------------+
// |        |--(C)-- Authorization Grant -->| Authorization |
// | Client |                               |     Server    |
// |        |<-(D)----- Access Token -------|               |
// |        |                               +---------------+
// |        |
// |        |                               +---------------+
// |        |--(E)----- Access Token ------>|    Resource   |
// |        |                               |     Server    |
// |        |<-(F)--- Protected Resource ---|               |
// +--------+                               +---------------+