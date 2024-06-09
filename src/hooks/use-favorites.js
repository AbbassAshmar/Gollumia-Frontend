import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



export default function useFavorites(movie){
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookies] = useCookies();
   
    const navigate = useNavigate();

    useEffect(() => {
        if (movie && movie.hasOwnProperty('is_favorite')) 
        setIsFavorite(movie.is_favorite);
     }, [movie]);

    useEffect(()=>{
        if (isLoading)
        requestAddOrRemoveFavorite(movie);
    },[isLoading])

    function addOrRemoveFavorite(){
        if (!cookies.token){
            navigate('/login')
        }else{
            if (!isLoading)
            setIsLoading(true);
        }
    }

    async function requestAddOrRemoveFavorite(movie){
        const URL =`${process.env.REACT_APP_API_URL}/api/users/user/favorites/`;
        const INIT = {
            method:"POST",
            headers:{
                "Authorization":"Token " + cookies.token,
                "content-type":"application/json"
            },
            body:JSON.stringify({movie_id : movie.id})
        }

        const request = await fetch(URL,INIT);
        if (request.status == 200){
            setIsFavorite(false);
        }

        if(request.status == 201){
            setIsFavorite(true);
        }

        setIsLoading(false)
    }


    return {addOrRemoveFavorite ,isFavorite};
}