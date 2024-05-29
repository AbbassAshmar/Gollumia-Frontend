import { useEffect, useState } from "react";

export default function useGetContentRatings(){
    const [contentRatings, setContentRatings] = useState([{name:'pg-13'}, {name:'pg-23'},{name:'kids'},{name:'adults'},{name:'idk'},{name:'far-from-kids'},{name:'pedos'},{name:'Scifie'},{name:'Scarrryy'},{name:'The witcher'},{name:'Just Bad'},]);

    async function requestContentRatings(){
        const URL = `${process.env.REACT_APP_API_URL}/api/content-ratings/`;
        const request = await fetch(URL);
        const contentRatingsList = await request.json();

        if (request?.status == 200){
            setContentRatings(contentRatingsList.data.content_ratings)
        }
    }

    useEffect(()=>{
        requestContentRatings();
    },[])

    return contentRatings;
}