import { useEffect, useState } from "react";
import FilterElementWrapper from "../FilterElementWrapper/filter-element-wrapper";
import styled from "styled-components";
import useGetGenres from "../../hooks/use-get-genres";
import { useSearchParams } from "react-router-dom";
import useGetContentRatings from "../../hooks/use-get-content-ratings";

const Form = styled.form`
display:flex;
flex-direction:column;
width:80%;
margin:auto;
`
const Buttons = styled.div`
display:flex;
gap:5px;
align-self:flex-start;
width:100%;
margin:1rem 0;
`
const SubmitBtn= styled.button`
background : orange;
padding:.25rem 1rem ;
border-radius:12px;
font-size:.9rem;
font-weight:300;
color:white;
`
const CloseBtn = styled(SubmitBtn)`
background:white;
color:black;
`

function FilterMenu({isActive, setIsActive}){
    const Genres = useGetGenres();
    const ContentRatings = useGetContentRatings();
    const [searchParams, setSearchParams] = useSearchParams();

    const Released= [
        {name:"All"},
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
                <div style={{width:"100%",margin:"auto"}}>
                    <FilterElementWrapper title="Released : " name="released" valueField={"name"} list={Released}/>
                    <FilterElementWrapper title="Rating : " name="contentRating" valueField={"name"} list={ContentRatings}/>
                    <FilterElementWrapper title="Genre : " name="genre" valueField={"name"} list={Genres}/>
                </div>
                <Buttons>
                    <SubmitBtn type="submit"><i className="fa-solid fa-filter"/>Filter</SubmitBtn>
                    <CloseBtn type="button" onClick={()=>{setIsActive(!isActive)}}>
                        <i style={{marginRight:".2rem",}} className="fa-solid fa-xmark"></i>Close
                    </CloseBtn>
                </Buttons>
            </Form>   
        </div>
    )
}

export default FilterMenu;