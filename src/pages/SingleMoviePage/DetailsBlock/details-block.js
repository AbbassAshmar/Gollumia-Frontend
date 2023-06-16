import styles from "../movie.module.css"


function DetailsBlock(props){

    return(
        <div className={`${styles.detailedText} ${styles.DirecterRatingCont}`}>
            <p className={styles.detailedTextFp}>{props.text}  </p>
            <p>{props.data ? props.data : "N/A"}</p>
        </div>
    )
}

export default DetailsBlock;