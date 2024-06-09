import { useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "./input-field";
import ProfilePicture from "../ProfilePicture/profile-picture";
import { useCookies } from "react-cookie";
import {Link, useParams} from "react-router-dom";
import CommentRepliesBox from "./comment-replies-box";

const Container = styled.div`
width: 100%;
display: flex;
gap:2rem;
`

const CommentsInputContainer = styled.div`
flex:3.5;
gap:2rem;
width:100%;
display:flex;
flex-direction: column;
`
const Header = styled.div`
gap:2rem;
display: flex;
flex-direction: column;
`
const DetailsCountContainer = styled.div`
width:100%;
display:flex;
justify-content: space-between;
`
const CountSortContainer = styled.div`
display:flex;
justify-content: flex-start;
gap:2rem;
`
const CommentsCount = styled.div`
color:white;
font-size:1rem;
`
const SortContainer = styled.div`
position: relative;
`
const SortButton = styled.button`
color:white;
&:hover{
    color:grey;
}
`
const SortList = styled.div`
left:0;
top: 115%;
z-index: 3;
overflow: hidden;
width: fit-content;
position: absolute;
transition: max-height .3s;
max-height: ${({show})=> show ? "20vh" : "0"};
`
const SortOption = styled.div`
gap:.5rem;
color:white;
display: flex;
font-size:14px;
cursor: pointer;
align-items: center;
padding: .75rem 1.5rem;
background-color: black;
border: 2px solid #878787;
justify-content: flex-start;
&:first-child{
    border-radius: 8px 8px 0 0;
}
&:last-child{
    border-top:none;
    border-radius:  0 0 8px 8px;
}
&:hover{
    background:#878787;
}
`
const LoginLink = styled(Link)`
color:orange;
text-decoration: none;
`
const InputContainer= styled.div`
width:100%;
display: flex;
gap:1rem;
`

const LogInAvatar = styled.div`
width:57px;
height:57px;
display:flex;
border-radius:17px;
background-color:orange;
justify-content:center;
align-items:center;
cursor:pointer;
`
const UserLockedIcon = styled.i`
font-size: 1.5rem;
`
const Content = styled.div`

`
const CommentsRepliesContainer = styled.div`
color:white;
gap:1.5rem;
display: flex;
flex-direction: column;
`
const RecommendationsContainer = styled.div`
flex:1;
gap:2rem;
display: flex;
flex-direction: column;
`
const MovieRecommendation = styled(Link)`

`
const MoviePoster = styled.img`
border-radius: 6px;
width:100%;
height:100%;
object-fit: contain;
`

const sortList = [{name : <span>Newest</span>, icon : <i className="fa-solid fa-clock"/>}, {name: <span>Hot</span>, icon : <i className="fa-solid fa-fire"/>}];

export default function CommentSection(){
    const { id } = useParams()    
    const [cookies,setCookies] = useCookies()

    const [commentsReplies, setCommentsReplies] = useState(RESPONSE.data.comments_replies);
    const [commentsRepliesCount,setCommentsRepliesCount] = useState(RESPONSE.metadata.comments_replies_count);

    const [recommendations, setRecommendations] = useState(MOVIES.data.movies);
    const [showSortList, setShowSortList] = useState(false);

    async function fetchCommentsAndReplies (id){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}/comments-and-replies/`);
        const response = await request.json();

        if (request.status == 200){
            setCommentsReplies(response.data.comments_replies);
            setCommentsRepliesCount(response.metadata.comments_replies_count)
        }
    }

    useEffect(()=>{
        fetchCommentsAndReplies(id)
    },[])

    function handleSortButtonClick(e){
        setShowSortList(!showSortList);
    }

    const renderAvatar = () => {
        if (cookies?.token) {
          return (
                <div style={{width:'57px', height:'57px'}}>
                    <ProfilePicture style={{borderRadius:"17px"}}/>
                </div>
            );
        }
        return (
            <LogInAvatar>
                <UserLockedIcon className="fa-solid fa-user-lock" />
            </LogInAvatar>
        );
    };

    return(
        <Container>
            <CommentsInputContainer>
                <Header>
                    <DetailsCountContainer>
                        <CountSortContainer>
                            <CommentsCount>
                                <i style={{marginRight:"8px"}} className="fa-solid fa-message"/>
                                Comments ({commentsRepliesCount})
                            </CommentsCount>
                            <SortContainer>
                                <SortButton onClick={handleSortButtonClick}>
                                    <i style={{marginRight:"8px"}} className="fa-solid fa-filter"/>
                                    Sort
                                </SortButton>
                                <SortList show={showSortList}>
                                    {sortList.map(option => (
                                        <SortOption>
                                            {option.icon}                                      
                                            {option.name}
                                        </SortOption>
                                    ))}
                                </SortList>
                            </SortContainer>
                        </CountSortContainer>
                        {!cookies.token && <LoginLink to={"/login"}>
                            Join us <i className="fa-solid fa-arrow-right"/>
                        </LoginLink>}
                    </DetailsCountContainer>
                    <InputContainer>
                        {renderAvatar()}
                        <InputField setCommentsRepliesCount={setCommentsRepliesCount} setCommentsReplies={setCommentsReplies}/>
                    </InputContainer>
                </Header>
                <Content>
                    <CommentsRepliesContainer>
                        {commentsReplies.length > 0 ? commentsReplies.map((comment)=>(
                            <CommentRepliesBox
                            setCommentsRepliesCount={setCommentsRepliesCount}
                            setCommentsReplies={setCommentsReplies}
                            key={comment.id} 
                            comment={{...comment}} 
                            repliesList={comment.replies}/>
                        )) : "No comments Yet !"}
                    </CommentsRepliesContainer>
                </Content>
            </CommentsInputContainer>
            <RecommendationsContainer>
                {recommendations.map((movie)=>(
                    <MovieRecommendation key={movie.id}>
                        <MoviePoster src={movie.poster} alt={`movie-${movie.name}-poster`} />
                    </MovieRecommendation>
                ))}
            </RecommendationsContainer>
        </Container>
    )
}

const MOVIES  = {
    data : {
        movies: [
            {
                id: 88,
                title: "Atlas",
                ratings: {
                    imdb: "7.3",
                    metacritics: "N/A"
                },
                released: "2024-05-23",
                plot: "A brilliant data analyst with a deep distrust of artificial intelligence joins a mission to capture a renegade robot with whom she shares a mysterious past.",
                contentRate: "N/A",
                duration: "99 min",
                trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                poster: "http://image.tmdb.org/t/p/w342//bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
                image: "http://image.tmdb.org/t/p/w300//beiWmXAZF5I557WgyMbAQTDGXli.jpg",
                thumbnail: null,
                imdbId: "tt5545880",
                director: {
                    id: 74,
                    name: "David Nawrath"
                },
                genre: [
                    "Action",
                    "Science",
                    "Fiction"
                ]
            },
            {
                id: 122,
                title: "Marvel Studios Assembled: The Making of X-Men '97",
                ratings: {
                    imdb: "N/A",
                    metacritics: "N/A"
                },
                released: "2024-05-22",
                plot: "In the early 1990s, few beyond those who journeyed into the pages of Marvel comics had ever heard of \"Rogue,\" \"Beast,\" \"Gambit,\" or even \"Wolverine.\" But that sad state of affairs changed forever when \"X-Men: The Animated Series\" debuted on television and touched millions hungry for something different. The series was unlike any cartoon that had come before it, exploring themes of prejudice and social justice. The characters were super, but they were also outsiders and underdogs. Kids everywhere could relate, as well as adults. \"Assembled\" recalls the birth of \"X-Men: The Animated Series\" and its revival thirty years later as \"X-Men '97.\" Spend time with the original cast members, along with new voices, as they reveal the stories behind the classic show and its uncompromising continuation.",
                contentRate: "N/A",
                duration: "N/A",
                trailer: null,
                poster: "http://image.tmdb.org/t/p/w342//1lHqdqVuyuQR5kMjMuGetN1Yy0b.jpg",
                image: "https://imdb-api.com/images/128x176/nopicture.jpg",
                thumbnail: null,
                imdbId: null,
                director: {
                    name: ""
                },
                genre: [
                    "Documentary"
                ]
            },
            {
                    id: 146,
                    title: "Nahir",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-22",
                    plot: "At 19 years old, Nahir Galarza (a crazy girl), after having brutally murdered his boyfriend, was sentenced to life in prison.",
                    contentRate: "N/A",
                    duration: "N/A",
                    trailer: "https://www.youtube.com/watch?v=95xhutcLjQ0",
                    poster: "http://image.tmdb.org/t/p/w342//3lCerAA6lArxaVskPqR586GJqB5.jpg",
                    image: "http://image.tmdb.org/t/p/w300//ptuVTyPF5n6PiVYkIsS82mQwFqC.jpg",
                    thumbnail: null,
                    imdbId: null,
                    director: {
                        name: ""
                },
                    genre: [
                        "Crime",
                        "Documentary"
                ]
            },
            {
                    id: 26,
                    title: "Furiosa: A Mad Max Saga",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-22",
                    plot: "As the world falls, young Furiosa is snatched from the Green Place of Many Mothers into the hands of a great biker horde led by the warlord Dementus. Sweeping through the wasteland, they encounter the citadel presided over by Immortan Joe. The two tyrants wage war for dominance, and Furiosa must survive many trials as she puts together the means to find her way home.",
                    contentRate: "N/A",
                    duration: "N/A",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
                    image: "http://image.tmdb.org/t/p/w300//shrwC6U8Bkst9T9J7fr1A50n6x6.jpg",
                    thumbnail: null,
                    imdbId: "tt12037194",
                    director: {
                        id: 19,
                        name: "George Miller"
                },
                    genre: [
                        "Action",
                        "Adventure",
                        "Science",
                         "Fiction"
                ]
            },
            {
                    id: 9,
                    title: "The Surfer",
                    ratings: {
                        imdb: "4.8",
                        metacritics: "N/A"
                },
                    released: "2024-05-17",
                    plot: "When a man returns to his beachside hometown in Australia, many years since building a life for himself in the U.S., he is humiliated in front of his teenage son by a local gang of surfers who claim strict ownership over the secluded beach of his childhood. Wounded, he decides to remain at the beach, declaring war against those in control of the bay. But as the conflict escalates, the stakes spin wildly out of control, taking him to the edge of his sanity.",
                    contentRate: "N/A",
                    duration: "90 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//Aon2f7zxDhxudqknkDvC6R7775k.jpg",
                    image: "http://image.tmdb.org/t/p/w300//1h6UuDmmKzFfHZOwQhildVK7ZB.jpg",
                    thumbnail: null,
                    imdbId: "tt0092031",
                    director: {
                        id: 9,
                        name: "Frank Shields"
                },
                    genre: [
                        "Drama",
                        "Thriller"
                ]
            },
            {
                    id: 17,
                    title: "Oh, Canada",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-17",
                    plot: "Famed Canadian-American leftist documentary filmmaker Leonard Fife was one of sixty thousand draft evaders and deserters who fled to Canada to avoid serving in Vietnam. Now in his late seventies, Fife is dying of cancer in Montreal and has agreed to a final interview in which he is determined to bare all his secrets at last, to demythologize his mythologized life.",
                    contentRate: "N/A",
                    duration: "55 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//6RGG01bamEKaQnGgqgAItdOJZhB.jpg",
                    image: "http://image.tmdb.org/t/p/w300//vzv9RRc6zMCFzkqBgULvQmjDYoN.jpg",
                    thumbnail: null,
                    imdbId: "tt3327168",
                    director: {
                        name: ""
                },
                    genre: [
                        "Drama"
                ]
            },
            {
                    id: 118,
                    title: "Babes",
                    ratings: {
                        imdb: "6.8",
                        metacritics: "N/A"
                },
                    released: "2024-05-17",
                    plot: "After getting pregnant from a one-night stand, a single woman leans on her married best friend and mother of two to guide her through gestation and beyond.",
                    contentRate: "N/A",
                    duration: "30 min",
                    trailer: "https://www.youtube.com/watch?v=E2ReABAgaDA",
                    poster: "http://image.tmdb.org/t/p/w342//jNZhSeDXDNX2rHqURPzq43lI6Xg.jpg",
                    image: "http://image.tmdb.org/t/p/w300//9KrNzjZRJ9oTbJvNABdu5ZP537Z.jpg",
                    thumbnail: null,
                    imdbId: "tt0098745",
                    director: {
                        name: ""
                },
                    genre: [
                        "Drama",
                        "Comedy"
                ]
            },
            {
                    id: 76,
                    title: "Hit Man",
                    ratings: {
                        imdb: "7.6",
                        metacritics: "N/A"
                },
                    released: "2024-05-17",
                    plot: "A mild-mannered professor moonlighting as a fake contract killer sparks a chain reaction of trouble when he falls for a client.",
                    contentRate: "R",
                    duration: "115 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//1126gjlBf4hTm9Sgf0ox3LGVEBt.jpg",
                    image: "http://image.tmdb.org/t/p/w300//36g54UwtRdoCf6A2rKujBWS17gE.jpg",
                    thumbnail: null,
                    imdbId: "tt20215968",
                    director: {
                        id: 63,
                        name: "Richard Linklater"
                },
                    genre: [
                        "Action",
                        "Comedy",
                        "Crime"
                ]
            },
            {
                    id: 135,
                    title: "Do You See What I See",
                    ratings: {
                        imdb: "5.9",
                        metacritics: "N/A"
                },
                    released: "2024-05-16",
                    plot: "Mawar is lonely a lot of the time, especially after losing both parents. She often vents to Vey, her housemate and closest friend about how she feels. During her birthday, Mawar wishes for a boyfriend to brighten up her days. Her wish is finally granted when she eventually meets Restu. Vey is equally excited whenever Mawar tells stories about him. However, uncanny events have started happening ever since. The whole house experiences a lot of mystical and horrific events until one day Vey finds a clue that these incidents are related to Mawar's new boyfriend, who is not a human.",
                    contentRate: "N/A",
                    duration: "14 min",
                    trailer: "https://www.youtube.com/watch?v=oZRUAxPxxlQ",
                    poster: "http://image.tmdb.org/t/p/w342//x7e1cuPF1e74kM9Ysbvn00tfLgB.jpg",
                    image: "http://image.tmdb.org/t/p/w300//naINavcuQWdvbVj9FRLJOPoPqII.jpg",
                    thumbnail: null,
                    imdbId: "tt5291770",
                    director: {
                        id: 111,
                        name: "Justin McConnell, Serena Whitney"
                },
                    genre: [
                        "Horror"
                ]
            },
            {
                    id: 15,
                    title: "Guruvayoorambala Nadayil",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-16",
                    plot: "Due to a web of unforeseen bad luck and circumstances, a betrothed young man ends up marrying a woman who hates him and has to suffer her wrath over it.",
                    contentRate: "N/A",
                    duration: "N/A",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//iSS17YFooUA33FKsJ0yJhWZzylb.jpg",
                    image: "http://image.tmdb.org/t/p/w300//bYNO2cFopBEwnVNWPEtFm2FAdjo.jpg",
                    thumbnail: null,
                    imdbId: null,
                    director: {
                        name: ""
                },
                    genre: [
                        "Comedy"
                ]
            },
            {
                    id: 14,
                    title: "Following",
                    ratings: {
                        imdb: "7.5",
                        metacritics: "60"
                },
                    released: "2024-05-15",
                    plot: "Realtor Jung-tae’s hobby is sneaking into strangers’ homes and peeping into their lives. One day, an unfamiliar face in the area grabs his attention – an Instagram star, So-ra. Miraculously, So-ra leaves her house key at Jung-tae’s agency and Jung-tae visits her home whenever he can, thrilled and excited. Like any other day, Jung-tae makes another visit and finds what he hadn’t expected: the dead body of So-ra. Jung-tae is shocked and he can’t call the police and report. But when he returns few hours later with a client… So-ra’s dead body is gone! Days later, Jung-tae receives a red note saying ‘It was you, right?’. Even worse, all evidences say that Jung-tae is the criminal. Can he find the real killer and clear his name?",
                    contentRate: "R",
                    duration: "69 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//txGP42LsRw0ylD7X4f6MvxHD2js.jpg",
                    image: "http://image.tmdb.org/t/p/w300//9ZcJT3plQQPnYqCRkTBbOSksVX8.jpg",
                    thumbnail: null,
                    imdbId: "tt0154506",
                    director: {
                        id: 13,
                        name: "Christopher Nolan"
                },
                    genre: [
                        "Mystery",
                        "Thriller"
                ]
            },
            {
                    id: 80,
                    title: "The Strangers: Chapter 1",
                    ratings: {
                        imdb: "6.6",
                        metacritics: "N/A"
                },
                    released: "2024-05-15",
                    plot: "After their car breaks down, a couple driving cross-country to begin a new life in the Pacific Northwest is forced to spend the night in a secluded rental, where they are terrorized from dusk till dawn by three masked strangers.",
                    contentRate: "R",
                    duration: "91 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//qyT2xw9FBxHlNXQYsuNCu8T7Rbo.jpg",
                    image: "http://image.tmdb.org/t/p/w300//6LksoR7reQ45gQRik0zhrHmcpZw.jpg",
                    thumbnail: null,
                    imdbId: "tt22050754",
                    director: {
                        id: 67,
                        name: "Renny Harlin"
                },
                    genre: [
                        "Horror",
                        "Thriller"
                ]
            },
            {
                    id: 18,
                    title: "Partiu América",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-14",
                    plot: "",
                    contentRate: "N/A",
                    duration: "N/A",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//eLckMzlleotgKEm04IIc0CplBZC.jpg",
                    image: "http://image.tmdb.org/t/p/w300//p4G9MWjrhNR0pv3Jd7FEJKgNVCa.jpg",
                    thumbnail: null,
                    imdbId: null,
                    director: {
                        name: ""
                },
                    genre: [
                        "Comedy"
                ]
            },
            {
                    id: 6,
                    title: "The Image of You",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-10",
                    plot: "Identical twins Anna and Zoe find their bond tested over Anna's new love, Nick. While the trusting Anna is head over heels, her skeptical sister Zoe senses a web of deceit. But as Zoe digs for the truth, they're all pulled into a dangerous game where honesty could prove fatal.",
                    contentRate: "R",
                    duration: "90 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//gboq2oB6QNBcW32V0A8uOajTwXU.jpg",
                    image: "http://image.tmdb.org/t/p/w300//aAEwcNhxUmeqZCpqAot3zk0KH3u.jpg",
                    thumbnail: null,
                    imdbId: "tt28332336",
                    director: {
                        id: 6,
                        name: "Jeff Fisher"
                },
                    genre: [
                        "Thriller"
                ]
            },
            {
                    id: 161,
                    title: "Poolman",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-09",
                    plot: "Darren Barrenman, an unwavering optimist and native Angeleno, spends his days looking after the pool of the Tahitian Tiki apartment block and fighting to make his hometown a better place to live.",
                    contentRate: "N/A",
                    duration: "100 min",
                    trailer: "https://www.youtube.com/watch?v=Xrrxay3-fk8",
                    poster: "http://image.tmdb.org/t/p/w342//vVz4Rh4j6FQTq9eva3xEvCMumAh.jpg",
                    image: "http://image.tmdb.org/t/p/w300//1X6VoJdaTwbxTpV7eutLbV0tJpn.jpg",
                    thumbnail: null,
                    imdbId: "tt18077924",
                    director: {
                        id: 134,
                        name: "Chris Pine"
                },
                    genre: [
                        "Mystery",
                        "Comedy"
                ]
            },
            {
                    id: 32,
                    title: "Vina: Sebelum 7 Hari",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-08",
                    plot: "Victim of atrocities by motorbike gangs in Cirebon, VINA did not accept that her death was called a single accident. Her spirit enters to reveal the facts. Before 7 Days, what actually happened?",
                    contentRate: "N/A",
                    duration: "N/A",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//j1xUlKVa8rS1c2mi0cZsjUSJ6G4.jpg",
                    image: "http://image.tmdb.org/t/p/w300//1V3nxNu6xwxOFQdMsCM699OsJCK.jpg",
                    thumbnail: null,
                    imdbId: "tt28857853",
                    director: {
                        id: 25,
                        name: "Anggy Umbara"
                },
                    genre: [
                        "Crime",
                        "Drama",
                        "Horror",
                        "Thriller"
                ]
            },
            {
                    id: 28,
                    title: "Mother of the Bride",
                    ratings: {
                        imdb: "6.2",
                        metacritics: "N/A"
                },
                    released: "2024-05-08",
                    plot: "A doting mom jets off to a tropical island resort for her daughter's wedding — only to discover the groom's father is the ex she hasn't seen in decades.",
                    contentRate: "TV-14",
                    duration: "94 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//vdTvwykMWvVgdaViBVRh8IFTku5.jpg",
                    image: "http://image.tmdb.org/t/p/w300//m0XCtFisSD0O6P55G1pUHdFccuL.jpg",
                    thumbnail: null,
                    imdbId: "tt0107605",
                    director: {
                        id: 21,
                        name: "Charles Correll"
                },
                    genre: [
                        "Comedy",
                        "Romance"
                ]
            },
            {
                    id: 30,
                    title: "IF",
                    ratings: {
                        imdb: "8.1",
                        metacritics: "75"
                },
                    released: "2024-05-08",
                    plot: "A girl discovers she can see everyone's imaginary friends and embarks on a magical adventure to reconnect forgotten IFs with their kids.",
                    contentRate: "PG-13",
                    duration: "141 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//xbKFv4KF3sVYuWKllLlwWDmuZP7.jpg",
                    image: "http://image.tmdb.org/t/p/w300//jTWllMddJzCb7hBVNZICtgKhYM9.jpg",
                    thumbnail: null,
                    imdbId: "tt0264464",
                    director: {
                        id: 23,
                        name: "Steven Spielberg"
                },
                    genre: [
                        "Comedy",
                        "Family",
                        "Fantasy"
                ]
            },
            {
                    id: 41,
                    title: "Kingdom of the Planet of the Apes",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-08",
                    plot: "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
                    contentRate: "PG-13",
                    duration: "145 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                    image: "http://image.tmdb.org/t/p/w300//fypydCipcWDKDTTCoPucBsdGYXW.jpg",
                    thumbnail: null,
                    imdbId: "tt11389872",
                    director: {
                        id: 33,
                        name: "Wes Ball"
                },
                    genre: [
                        "Action",
                        "Adventure",
                        "Science",
                        "Fiction"
                ]
            },
            {
                    id: 59,
                    title: "Chief of Station",
                    ratings: {
                        imdb: "4.6",
                        metacritics: "N/A"
                },
                    released: "2024-05-02",
                    plot: "After learning that the death of his wife was not an accident, a former CIA Station Chief is forced back into the espionage underworld, teaming up with an adversary to unravel a conspiracy that challenges everything he thought he knew.",
                    contentRate: "N/A",
                    duration: "97 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//uuA01PTtPombRPvL9dvsBqOBJWm.jpg",
                    image: "http://image.tmdb.org/t/p/w300//rmNlWyez5cniGtXkgixG1ezdqVk.jpg",
                    thumbnail: null,
                    imdbId: "tt21301418",
                    director: {
                        id: 49,
                        name: "Jesse V. Johnson"
                },
                    genre: [
                        "Action",
                        "Thriller"
                    ]
            },
            {
                    id: 65,
                    title: "The Idea of You",
                    ratings: {
                        imdb: "N/A",
                        metacritics: "N/A"
                },
                    released: "2024-05-02",
                    plot: "Solène, a 40-year-old single mom, begins an unexpected romance with 24-year-old Hayes Campbell, the lead singer of August Moon, the hottest boy band on the planet. When Solène must step in to chaperone her teenage daughter's trip to the Coachella Music Festival after her ex bails at the last minute, she has a chance encounter with Hayes and there is an instant, undeniable spark. As they begin a whirlwind romance, it isn't long before Hayes' superstar status poses unavoidable challenges to their relationship, and Solène soon discovers that life in the glare of his spotlight might be more than she bargained for.",
                    contentRate: "R",
                    duration: "115 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg",
                    image: "http://image.tmdb.org/t/p/w300//6Xfj8wD7GoEysgcFayRKd6QLqai.jpg",
                    thumbnail: null,
                    imdbId: "tt9466114",
                    director: {
                        id: 54,
                        name: "Michael Showalter"
                },
                    genre: [
                        "Comedy",
                        "Drama",
                        "Romance"
                ]
            },
            {
                    id: 29,
                    title: "Tarot",
                    ratings: {
                        imdb: "5.0",
                        metacritics: "N/A"
                },
                    released: "2024-05-01",
                    plot: "When a group of friends recklessly violates the sacred rule of Tarot readings they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.",
                    contentRate: "PG-13",
                    duration: "92 min",
                    trailer: "https://www.youtube.com/watch?v=https://imdb-api.com/images/128x176/nopicture.jpg",
                    poster: "http://image.tmdb.org/t/p/w342//gAEUXC37vl1SnM7PXsHTF23I2vq.jpg",
                    image: "http://image.tmdb.org/t/p/w300//otfoeC96neoOdA4HqsX06OWuzE9.jpg",
                    thumbnail: null,
                    imdbId: "tt14088510",
                    director: {
                        id: 22,
                        name: "Spenser Cohen, Anna Halberg"
                },
                    genre: [
                        "Horror",
                        "Thriller"
                ]
            },
        ]
    }
}
const RESPONSE = {
        status: "success",
        error: null,
        data: {
            comments_replies: [
            {
                id: 3,
                likes: 0,
                dislikes: 0,
                text: "comment3",
                created_at: "2024-05-21T06:27:19Z",
                user: {
                    id: 1,
                    email: "a@gmail.com",
                    username: "a",
                    password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                    pfp: null
                },
                movie: 7,
                likes_dislikes: [],
                replies: []
            },
            {
                id: 2,
                likes: 0,
                dislikes: 0,
                text: "comment2",
                created_at: "2024-05-21T06:27:07Z",
                user: {
                    id: 1,
                    email: "a@gmail.com",
                    username: "a",
                    password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                    pfp: null
                },
                movie: 7,
                likes_dislikes: [],
                replies: []
            },
            {
                id: 1,
                likes: 0,
                dislikes: 0,
                text: "comment1",
                created_at: "2024-05-21T06:26:54Z",
                user: {
                    id: 1,
                    email: "a@gmail.com",
                    username: "a",
                    password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                    pfp: null
                },
                movie: 7,
                likes_dislikes: [],
                replies: [
                    {
                        id: 1,
                        likes: 0,
                        dislikes: 0,
                        text: "reply_comment_1",
                        created_at: "2024-05-21T06:38:32Z",
                        user: {
                            id: 1,
                            email: "a@gmail.com",
                            username: "a",
                            password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                            pfp: null
                        },
                        movie: 7,
                        parent_comment: 1,
                        replying_to: {
                            id:2,
                            text: "comment1",
                            movie: 7,
                            user: {
                                id: 1,
                                email: "a@gmail.com",
                                username: "a",
                                password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                                pfp: null
                            },
                            likes: 0,
                            dislikes: 0,
                            parent_comment: null,
                            created_at: "2024-05-21T06:26:54Z"
                        },
                        likes_dislikes: []
                    },
                    {
                        id: 2,
                        likes: 0,
                        dislikes: 0,
                        text: "reply_comment_1",
                        created_at: "2024-05-21T06:38:50Z",
                        user: {
                            id: 1,
                            email: "a@gmail.com",
                            username: "a",
                            password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                            pfp: null
                        },
                        movie: 7,
                        parent_comment: 1,
                        replying_to: {
                            id:2,
                            text: "comment1",
                            movie: 7,
                            user: {
                                id: 1,
                                email: "a@gmail.com",
                                username: "a",
                                password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                                pfp: null
                            },
                            likes: 0,
                            dislikes: 0,
                            parent_comment: null,
                            created_at: "2024-05-21T06:26:54Z"
                        },
                        likes_dislikes: []
                    },
                    {
                        id: 3,
                        likes: 0,
                        dislikes: 0,
                        text: "reply_to_reply_1_of_comment_1",
                        created_at: "2024-05-21T06:52:20Z",
                        user: {
                            id: 1,
                            email: "a@gmail.com",
                            username: "a",
                            password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                            pfp: null
                        },
                        movie: 7,
                        parent_comment: 1,
                        replying_to: {
                            id:2,
                            text: "reply_comment_1",
                            movie: 7,
                            user: {
                                id: 1,
                                email: "a@gmail.com",
                                username: "a",
                                password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                                pfp: null
                            },
                            likes: 0,
                            dislikes: 0,
                            parent_comment: 1,
                            created_at: "2024-05-21T06:38:32Z"
                        },
                        likes_dislikes: []
                    }
                ]
            }
        ]
    },
    metadata: {
        comments_replies_count: 6
    }
}
