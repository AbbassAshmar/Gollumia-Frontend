


import { useEffect } from "react";


// state boolean show , if a list is opened , listening to clicks starts

export default function useClickOutside(refs,state,callback){
    useEffect(()=>{
        function handleClickOutside(e){
            let contains = false;

            for (let element of refs){
                if (element?.current && element.current.contains(e.target) ){
                    contains = true 
                    break;
                }
            }

            if (!contains){
                callback()
                document.removeEventListener('click', handleClickOutside);
            }
        }

        if (state){
            document.addEventListener('click',handleClickOutside);
        }

    },[state])
}   