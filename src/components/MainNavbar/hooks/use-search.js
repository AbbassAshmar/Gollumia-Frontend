import { useNavigate } from "react-router-dom";

export default function useSearch({setSearchInputValue, setSearchResults}){
    const navigate = useNavigate();

    async function requestMoviesOnSeachInputChange(title){
        let url = `/api/movies/?title=${title}&start=0&limit=5`
        const request = await fetch(`${process.env.REACT_APP_API_URL}${url}`);
        const response = await request.json();

        if (request?.status == 200){
            setSearchResults(response.data.movies)
        }
    }
    
    function handleSearchInputChange(e){
        let search_input = e.currentTarget.value
        setSearchInputValue(search_input)

        search_input = search_input.trim()
        if(search_input.length>=1){
            requestMoviesOnSeachInputChange(search_input)
        }else{
            setSearchResults([])
        }
    }

    function handleSearchFormSubmit(e){
        e.preventDefault()
        let data = new FormData(e.currentTarget);
        let value= data.get('search-input').trim();
        navigate(`/movies/?title=${value}`)
    }


    return {handleSearchFormSubmit, handleSearchInputChange};
    
}