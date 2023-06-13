import styles from "../movie.module.css"

function Ratings({rating,icon}){
    
return (
    <div className={styles.ratingsDiv}>
        <img className={styles.imdbIcon} src={icon}/>
        <span>{rating ? rating : "N?A"}</span>
    </div>
)

}
export default Ratings;