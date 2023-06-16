import styles from "../movie.module.css"
import GenresList from "../GenresList/genres-list"


function GenresContainer(props){

    return (
        <div className={props.classes}>
            <p className={styles.detailedTextFp}>Genres  </p>
            <GenresList genres={props.genres} />
        </div>

    )
}

export default GenresContainer;