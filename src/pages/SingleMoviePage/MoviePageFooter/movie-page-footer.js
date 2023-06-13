import App from "../../../components/Footer/footer"

function MoviePageFooter(){
    return(
        <div style={{backgroundColor:"black"}}>
            <div style={{height:"3.5rem",width:"100%"}}></div>
            <div className="emptyline"></div>
            <div style={{height:"1rem",width:"100%"}}></div>
            <App />
        </div>
    )
}

export default MoviePageFooter;