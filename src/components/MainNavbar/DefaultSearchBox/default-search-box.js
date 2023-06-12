

function DefaultSearchBox(){

    return (
        <form onSubmit={props.handleSearchSubmit}>
            <div className="search">
                <input  
                    onChange={props.handleSearchChange}
                    className="searchInput" 
                    name="search-input" 
                    type="text" 
                    placeholder="search"
                />
                <i className="fa-solid fa-magnifying-glass"></i>        
            </div>  
        </form>
        
    )

}

export default DefaultSearchBox;