import { useEffect, useState } from "react";



export default function useGetGenres(){
    const [genres, setGenres] = useState([{name:'shadow'}, {name:'adventure'},{name:'gaming'},{name:'life'},{name:'Horror'},{name:'Sports'},{name:'Football'},{name:'Scifie'},{name:'Scarrryy'},{name:'The witcher'},{name:'Just Bad'},]);

    async function requestGenres(){
        const URL = `${process.env.REACT_APP_API_URL}/api/genres/`;
        const request = await fetch(URL);
        const genre_list = await request.json();

        if (request?.status == 200){
            setGenres(genre_list.data.genres)
        }
    }
    

    useEffect(()=>{
        requestGenres();
    },[])

    return genres;
}