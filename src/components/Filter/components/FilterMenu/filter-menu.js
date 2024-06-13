import FilterElementWrapper from "../FilterElementWrapper/filter-element-wrapper";
import styled from "styled-components";
import useGetGenres from "../../../../hooks/use-get-genres";
import { useSearchParams } from "react-router-dom";
import useGetContentRatings from "../../../../hooks/use-get-content-ratings";

const Form = styled.form`
gap:2rem;
display:flex;
flex-direction:column;
width:80%;
margin:auto;
`
const FilterRows = styled.div`
width:100%;
`
const Buttons = styled.div`
gap:1rem;
display:flex;
align-self:flex-start;
width:100%;
margin:1rem 0;
`
const SubmitButton= styled.button`
color:white;
background :var(--main-color);
border-radius:6px;
padding:.35rem 1rem;
font-size: var(--body);
&:hover{
    background :var(--main-color-dark);
}
`
const CloseButton = styled(SubmitButton)`
background:transparent;
color:grey;

&:hover{
    color:white;
    background-color: transparent;
}
`



function FilterMenu({isActive, setIsActive}){
    const Genres = useGetGenres();
    const ContentRatings = useGetContentRatings();
    const [searchParams, setSearchParams] = useSearchParams();

    const Released= [
        {name:"Unreleased"},
        {name:"2023"},
        {name:"2022"},
        {name:"2021"},
        {name:"2020"},
        {name:"2019"},
        {name:"older"}
    ]

    function handleFilterFormSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()){
            searchParams.set(key, value);
        }

        searchParams.set('page',"1");
        setSearchParams(searchParams);
    }
   
    return(
        <div style={{transition:"all 0.3s",maxHeight:`${isActive?"200vh":"0"}`,overflow:"hidden"}}>
            <Form onSubmit={handleFilterFormSubmit}>
                <FilterRows>
                    <FilterElementWrapper title="Released : " name="released" valueKey={"name"} list={Released}/>
                    <FilterElementWrapper title="Rating : " name="rating" valueKey={"name"} list={ContentRatings}/>
                    <FilterElementWrapper title="Genre : " name="genre" valueKey={"name"} list={Genres}/>
                </FilterRows>
                <Buttons>
                    <SubmitButton type="submit">
                        <i style={{marginRight:'.5rem'}} className="fa-solid fa-filter"/>
                        Filter
                    </SubmitButton>
                    <CloseButton type="button" onClick={()=>{setIsActive(!isActive)}}>
                        <i style={{marginRight:'.5rem'}}  className="fa-solid fa-xmark"></i>Close
                    </CloseButton>
                </Buttons>
            </Form>   
        </div>
    )
}

export default FilterMenu;