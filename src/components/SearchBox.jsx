import React, { useContext, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { AppContext } from '../context/AppContext';

function SearchBox() {
    const [inputValue, setInputValue] = useState('')
    const { imageData, setCurrentImage,showSearchBox,setShowSearchBox } = useContext(AppContext)
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = (value) => {
        if (value.trim() === '') {
            setSearchResults([]); // Clear results if search box is empty
            return;
        }
        const filteredResults = imageData.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.cat.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
        handleSearch(e.target.value)
    }
    const handleClick = (e) => {
        setCurrentImage(e)
        setShowSearchBox(false)
        setInputValue('')
        setSearchResults([])
    }
    if(showSearchBox){
        return (
        <div className='search-main'>
            <div className='container'>
                <input type="text" placeholder='Search' value={inputValue} onChange={handleChange} />
                <div className='search-icon'><IoSearchSharp /></div>
                <div className='search-results-container'> {/* Added a container for results */}
                    {searchResults.length > 0 ? (
                        searchResults.map((e, i) => (
                            <div key={e.id || i} className='search-result-item' onClick={()=>{handleClick(e)}} > {/* Use unique id for key */}
                                <img src={e.thumb} alt=""  />
                                <p>{e.name}</p>
                            </div>
                        ))
                    ) : (
                        inputValue.trim() !== '' && <div className='no-results'>No results found.</div>
                    )}
                </div>
            </div>
        </div>
    )
    }else{
        return null
    }
}

export default SearchBox