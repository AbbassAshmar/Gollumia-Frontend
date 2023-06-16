import styles from '../movie.module.css'
import ReactPlayer from "react-player"

function Trailer (props){

    return (
        <div className={styles.trailerContainer}>
            <h3 className={styles.sectionTitle}>Tailer</h3>
            <div className={styles.movieTrailerContainer} >
                {/* <iframe className={styles.movieTrailer} src={state.trailer} title="Rick and Morty Season 4 - Official Trailer" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                <ReactPlayer style={{margin:"auto"}} url={props.trailer} light={props.thumbnail? props.thumbnail:true}/>
            </div>
        </div>
    )
}

export default Trailer;