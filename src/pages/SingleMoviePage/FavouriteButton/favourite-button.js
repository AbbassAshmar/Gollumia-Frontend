import { useCookies } from "react-cookie"
import styles from "../movie.module.css"
import { useState ,useEffect} from "react"

function FavouriteButton({movieId}){
    const [cookies, setCookies] =useCookies()
    const [favouriteButtonColor, setFavouriteButtonColor] = useState("white")

    // check whether a movie is added to favourites or not to decide the color of the fav heart
    const CheckIfFavourite = async function(){
        const request = await fetch(`http://127.0.0.1:8000/api/movies/favorites/${cookies.id}/${movieId}`,{
            method:"get",
            headers:{
                "Authorization":"Token "+cookies.token,
                "Content-type":"application/json"
            }
        })
        const checkFavourite = await request.json()
        if (request.ok==true && checkFavourite.found==false){
            setFavouriteButtonColor("white")
        }
        else if(request.ok==true && checkFavourite.found == true){
            setFavouriteButtonColor("red")
        }
    }

    // request to add or remove a movie from favourites
    async function AddRemoveFavourite(){ 
        let data = {
            email:cookies.email,
            movie_id: movieId
        }
        const request = await fetch("http://127.0.0.1:8000/api/movies/favorites",{
            method:"post",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json",
                "Authorization":"Token "+ cookies.token,
            }
        })
        const resp= await request.json()
        if(request.ok ==true && request.status ==200){
            if (resp['deleted/created'] == 'created'){
                setFavouriteButtonColor('red')
            }else(
                setFavouriteButtonColor("white")
            )
        }
        return request
    }
    
    useEffect(()=>{ 
        CheckIfFavourite()
    },[])


    return(
        <button className={`${styles.favBtn} ${styles.exBtns}`} >
            <i onClick={AddRemoveFavourite} style={{color:favouriteButtonColor}} className="fa-solid fa-heart"></i>
        </button>
    )

}


export default FavouriteButton;