import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"
import Slider from "react-slick"
import SliderItem from "./slider-element";
import {useEffect, useState} from "react"

// function clearTitle(title){
//     console.log(title)
//     let cleartitle = ""
//     for(let i=0;i<title.length;i++){
//       if (title[i] !=":"){
//         cleartitle += title[i]
//       }
//     }
//     cleartitle = cleartitle.replace(/\s/g, '')
//     return cleartitle;
//   }


function Crousel(props){
  const [iData,setiData] = useState([])

    
    useEffect(()=>{
      setiData(props.Moviesdata.slice(0,8))
    },[props])

    const settings ={
        dots:true,
        infinite:true,
        speed:300,
        slidesToShow:1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:true,
        autoplaySpeed:5000,
        draggable:true,
        fade:false,
    }
    

    return(
        <div className="carousel-container">
          <Slider className="carousel-moviespage" {...settings}>
            {iData.map((item)=>{
              let src = `${item.title}.jpg`
              src = src.replace(/\s/g, '').replace(":","").replace("(","").replace(")","")
              return <SliderItem key={item.id} 
              id={item.id} 
              title={item.title} 
              imgsrc={src} 
              time={item.duration} 
              genre={item.genre} 
              dir={item.director} 
              year={item.released}
              metaCritics={item.ratings.metacritics} 
              imdb={item.ratings.imdb} 
              plot={item.plot}/>
            })}
          </Slider>
        </div>

    )

}

export default Crousel;