import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ba from "../photos/ba.jpeg"
import formimg from "../photos/formimg.jpg";
import bt from "../photos/ba.jpg";
import "./carousel.css"
import Slider from "react-slick"
import SliderItem from "./sliderItem";
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
      console.log(iData)
    },[props])
    useEffect(()=>{
      console.log(iData)
    },[iData])
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
    
    // clearTitle(data[0].title)
{/* <SliderItem imgsrc={ba} title="uncharted" time="123" dir="benjamin mendy" genre="action horror adventure" metaCritics="70" imdb="8.9" year="2022" plot="Two lifelong friends find themselves at an impasse when one abruptly ends their relationship, with alarming consequences for both of them."/> */}
    return(
        <div className="carousel-container">
          <Slider className="carousel-moviespage" {...settings}>
            {iData.map((item)=>{
              let src = `${item.title}.jpg`
              src = src.replace(/\s/g, '').replace(":","").replace("(","").replace(")","")
              return <SliderItem key={item.id} id={item.id} title={item.title} imgsrc={src} time={item.duration} genre={item.genre} dir={item.director} year={item.released} metaCritics={item.ratings.metacritics} imdb={item.ratings.imdb} plot={item.plot}/>
            })}
          </Slider>
        </div>

    )

}

export default Crousel;