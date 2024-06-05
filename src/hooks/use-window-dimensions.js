import { useEffect, useState } from "react";


export default function useWindowDimensions(){
    const [dimensions, setDimensions] = useState({width:window.innerWidth, height:window.innerHeight});

    const updateDimensions = ()=>{
        setDimensions({width:window.innerWidth, height:window.innerHeight});
    }   

    useEffect(()=>{
        window.addEventListener('resize',updateDimensions);
        return ()=>{
            window.removeEventListener('resize',updateDimensions);
        }
    },[])

    return dimensions;
}