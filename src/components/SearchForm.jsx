import React, { useState, useEffect, useContext } from 'react'
import { useDebounce } from 'use-debounce';
import { NewsContext } from '../context/NewsContext'

const SearchForm = () => {
    const [text, setText] = useState('');
    const [value] = useDebounce(text, 500);
    const { searchNews, searchResult } = useContext(NewsContext)

    useEffect(() => {
        console.log(value)
        searchNews(value)
    }, [value])

    useEffect(() => {
        console.log(searchResult)
    }, [searchResult])
    

    const handleTyping = (e) => {
        setText(e.target.value);
    }

    return (
        <div>
            <form className='form-search' action="/search" method="get">
                <input type="text" name="searchText" className='search-input' onChange={handleTyping} placeholder='Tìm kiếm' />
                <div className="dropdown-menu-search active">
                    {searchResult.length > 0 && searchResult.map((item, index) => (
                        <a key={index} href={`/${item?.category_param.split('__')[0]}/${item?.news_url_param}`}>{item?.title}</a>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default SearchForm