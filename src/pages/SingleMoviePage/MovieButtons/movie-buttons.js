import styles from "../movie.module.css"
import FavouriteButton from "../FavouriteButton/favourite-button";
function MovieButtons({id}){
    return (
        <div className={styles.btnsContainer}>
            <button className={styles.whatchNowBtn}>Watch now</button>
            <FavouriteButton movieId={id}/>
            <button className={`${styles.trailerBtn} ${styles.exBtns}`} >Trailer</button>
            <button className={`${styles.shareBtn} ${styles.exBtns}`} >
                <i className="fa-solid fa-share"></i>
            </button>
        </div>
    )
}
export default MovieButtons;