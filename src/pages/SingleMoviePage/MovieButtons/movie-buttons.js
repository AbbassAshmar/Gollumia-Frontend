import styles from "../movie.module.css"
import FavouriteButton from "../FavouriteButton/favourite-button";
import styled from "styled-components";

export const WatchNow  = styled.button`
margin: 10px 0 0 0px;
padding: 5.5px 15px;
text-align: center;
transition: 0.5s;
background-size: 200% auto;
color: white;
border-radius: 5px;
display: block;
border: 0px;
font-weight: 700;
font-size: 0.9rem;
box-shadow: 0px 0px 14px -7px #f09819;
background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);

    &:hover{
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
    &:active{
        transform: scale(0.95);
    }

    @media screen and (max-width:700px){
        padding: 3px 10px 5px 10px;    
    }

    @media screen and (max-width:577px){
        display:none;
    }
`

const Container = styled.div`

`
function MovieButtons({id}){
    return (
        <>
        <Container>
            <div className={styles.btnsContainer}>
                <WatchNow >Watch now</WatchNow>
                <FavouriteButton movieId={id}/>
                <button className={`${styles.shareBtn} ${styles.exBtns}`} >
                    <i className="fa-solid fa-share"></i>
                </button>
                <button  className={`${styles.trailerBtn} ${styles.exBtns}`} >Trailer</button>
            </div>
            <button style={{padding: ".3rem .7rem .2rem .7rem"}} className={`${styles.trailerBtn2} ${styles.exBtns}`} >Trailer</button>
        </Container>
        </>
    )
}
export default MovieButtons;