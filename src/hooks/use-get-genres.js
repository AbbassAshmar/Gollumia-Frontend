import { useEffect, useState } from "react";



export default function useGetGenres(){
    const [genres, setGenres] = useState([]);

    async function requestGenres(){
        const URL = `${process.env.REACT_APP_API_URL}/api/genres/`;

        try{
            const request = await fetch(URL);
            const response = await request.json();
            if (request?.status == 200){
                setGenres(response.data.genres)
            }
        }catch(error){
            setGenres([])
        }
    } 

    useEffect(()=>{
        requestGenres();
    },[])

    return genres;
}